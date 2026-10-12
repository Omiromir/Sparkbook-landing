"""Production smoke check: server SEO, locales, responsive UI and real anchors."""
from pathlib import Path
from html.parser import HTMLParser
import json, struct, sys, urllib.request, urllib.parse, urllib.error
from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000").rstrip("/")
OUT = Path(__file__).resolve().parents[1] / "output/playwright"
OUT.mkdir(parents=True, exist_ok=True)

class Head(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta = {}; self.links = []; self.language = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta": self.meta[attrs.get("name") or attrs.get("property")] = attrs.get("content")
        if tag == "link": self.links.append(attrs)
        if tag == "html": self.language = attrs.get("lang")

def get(path):
    return urllib.request.urlopen(BASE + path, timeout=90)


def check_documents(browser):
    documents = json.loads((Path(__file__).resolve().parents[1] / "lib/information.json").read_text(encoding="utf-8"))
    class Text(HTMLParser):
        def __init__(self): super().__init__(); self.parts = []
        def handle_data(self, data): self.parts.append(data)
    def text(html):
        parser = Text(); parser.feed(html)
        return " ".join("".join(parser.parts).split())
    for locale in ("kk", "ru", "en"):
        for slug, document in documents["kk" if locale == "kk" else "ru"].items():
            path = "/" + locale + "/" + slug
            head = Head(); head.feed(get(path).read().decode())
            assert head.language == locale
            canonical = "/" + ("ru" if locale == "en" else locale) + "/" + slug
            assert any(a.get("rel") == "canonical" and a["href"].endswith(canonical) for a in head.links)
            assert {"kk", "ru"} <= {a.get("hreflang") for a in head.links}
            if document["draft"] or locale == "en": assert "noindex" in head.meta["robots"]
            for width in (375, 1440):
                page = browser.new_page(viewport={"width": width, "height": 900}, reduced_motion="reduce")
                errors = []; page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(BASE + path, wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), path
                assert " ".join(page.locator(".document-body").text_content().split()) == text(document["html"]), "source text changed"
                assert page.locator(".document-draft").count() == int(document["draft"])
                assert page.locator(".document-language-note").count() == int(locale == "en")
                current = page.locator('.document-sidebar a[aria-current="page"]')
                assert current.get_attribute("href") == path
                assert page.evaluate("new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size === document.querySelectorAll('[id]').length"), "duplicate id"
                if width == 375:
                    assert current.evaluate("e=>e.getBoundingClientRect().left>=e.parentElement.getBoundingClientRect().left-1 && e.getBoundingClientRect().right<=e.parentElement.getBoundingClientRect().right+1"), "current page outside mobile menu"
                assert page.locator('.nav-links a[href="/' + locale + '#app"]').count() == 1
                assert page.locator('.footer-email').get_attribute("href") == "mailto:support@sparkbook.kz"
                assert page.evaluate("""[...document.querySelectorAll('.document-sidebar a, .document-toc a, .site-footer a, summary, button')].filter(e=>e.checkVisibility()).every(e=>e.getBoundingClientRect().height>=44)"""), "small standalone target"
                page.locator(".document-toc summary").focus(); page.keyboard.press("Enter")
                assert page.locator(".document-toc").get_attribute("open") is not None
                assert page.evaluate("""[...document.querySelectorAll('.document-toc a')].every(a=>document.getElementById(a.hash.slice(1)))""")
                page.locator(".document-toc a").last.click()
                assert page.evaluate("document.activeElement.id") == document["toc"][-1]["id"]
                assert page.evaluate("document.activeElement.getBoundingClientRect().top >= document.querySelector('.nav').getBoundingClientRect().bottom"), "toc behind nav"
                if slug == "support":
                    question = page.locator(".document-body details").first
                    question.locator("summary").focus(); page.keyboard.press("Enter")
                    assert question.get_attribute("open") is not None
                    question.locator("p").first.wait_for(state="visible")
                tables = page.locator(".table-scroll")
                for table in tables.all():
                    table.focus()
                    assert table.get_attribute("role") == "region" and table.get_attribute("aria-label")
                    if width == 375: assert table.evaluate("(e)=>e.scrollWidth>e.clientWidth")
                if locale == "ru" and slug in ("support", "privacy"):
                    page.evaluate("scrollTo(0,0)")
                    page.screenshot(path=str(OUT / f"{slug}-{width}.png"))
                    if tables.count():
                        tables.first.scroll_into_view_if_needed()
                        page.screenshot(path=str(OUT / f"{slug}-table-{width}.png"))
                assert not errors, errors
                page.close()
            print(path + ": preserved text, metadata, responsive layout, contents, focus and targets OK")
    page = browser.new_page(viewport={"width":375,"height":812}, reduced_motion="reduce")
    page.goto(BASE + "/ru/privacy", wait_until="networkidle")
    page.locator(".language-switch summary").click()
    page.locator('.language-options a[href="/kk/privacy"]').click()
    page.wait_for_url("**/kk/privacy")
    assert page.locator(".document-body").get_attribute("lang") == "kk"
    page.locator(".menu-toggle").click()
    page.locator('.nav-links a[href="/kk#app"]').click()
    page.wait_for_url("**/kk#app")
    assert page.locator("#app").is_visible()
    page.close()
    fallback = browser.new_page(java_script_enabled=False, viewport={"width":375,"height":812})
    fallback.goto(BASE + "/ru/support")
    fallback.locator(".document-body details summary").first.click()
    assert fallback.locator(".document-body details").first.get_attribute("open") is not None
    assert fallback.locator(".footer-documents a").count() == 3
    fallback.close()
    try: get("/ru/unknown")
    except urllib.error.HTTPError as error: assert error.code == 404
    else: raise AssertionError("unknown document should be 404")
    sitemap = get("/sitemap.xml").read().decode()
    assert "/ru/support" in sitemap and "/kk/support" in sitemap
    assert not any("/" + slug in sitemap for slug in ("privacy","terms","consent","delete-account"))
    print("Document locale context, native FAQ without JS, unknown-route 404 and draft sitemap exclusion OK")


def main():
    for locale in ("kk", "ru", "en"):
        head = Head(); head.feed(get("/" + locale).read().decode())
        assert head.language == locale
        assert 150 <= len(head.meta["description"]) <= 160
        assert head.meta["og:type"] == "website"
        assert head.meta["og:site_name"] == "Sparkbook"
        assert head.meta["twitter:card"] == "summary_large_image"
        assert head.meta["og:image"].startswith("http")
        if BASE.startswith("https://"):
            assert head.meta["og:image"].startswith(BASE + "/"), "wrong production OG domain"
            assert any(a.get("rel") == "canonical" and a["href"] == BASE + "/" + locale for a in head.links)
            assert "noindex" not in head.meta.get("robots", "")
        assert any(a.get("rel") == "canonical" and a["href"].endswith("/" + locale) for a in head.links)
        assert {"kk", "ru", "en", "x-default"} <= {a.get("hreflang") for a in head.links}
        image = get(urllib.parse.urlsplit(head.meta["og:image"]).path)
        data = image.read()
        assert data[:8] == b"\x89PNG\r\n\x1a\n" and struct.unpack("!II", data[16:24]) == (1200, 630), "OG preview failed"
        (OUT / f"og-{locale}.png").write_bytes(data)
        print(locale + ": server HTML, 150-160 description, OG/Twitter/canonical/hreflang and PNG OK")
    sitemap = get("/sitemap.xml").read().decode()
    assert all("/" + lang in sitemap for lang in ("kk", "ru", "en"))
    robots = get("/robots.txt").read().decode()
    assert "User-Agent: *" in robots
    if BASE.startswith("https://"):
        assert "Allow: /" in robots and BASE + "/sitemap.xml" in robots
        assert "localhost" not in sitemap
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width, height in [(1440, 900), (768, 1024), (375, 812)]:
            for locale in ("kk", "ru", "en"):
                page = browser.new_page(viewport={"width": width, "height": height}, reduced_motion="reduce")
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(BASE + "/" + locale, wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                for image in page.locator('img[loading="lazy"]').all():
                    if image.is_visible(): image.scroll_into_view_if_needed()
                page.wait_for_function("[...document.images].filter(i => i.checkVisibility()).every(i => i.complete && i.naturalWidth > 0)")
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (width, locale)
                assert page.locator(".heatmap > span").count() == 119
                assert page.locator(".benefit").count() == 6
                assert page.locator(".hero-objects[aria-hidden=true] img").count() == 4
                assert page.locator(".hero-motion-toggle").is_hidden()
                assert page.locator(".hero-object img").first.evaluate("(e)=>getComputedStyle(e).animationName") == "none"
                if locale == "ru":
                    page.evaluate("scrollTo(0,0)")
                    page.screenshot(path=str(OUT / f"hero-{width}.png"))
                assert page.locator(".nav-links>a").evaluate_all("es=>es.map(e=>e.getAttribute('href'))") == ["#subjects","#app","#features","#faq","#download"]
                assert page.locator(".nav-dropdown").count() == 0
                assert page.locator(".footer-column>a").count() == 5
                assert page.locator(".benefits-portrait").get_attribute("alt") == ""
                assert page.evaluate("[...document.querySelectorAll('.nav-links>a')].every(a=>document.querySelector(a.getAttribute('href')).tagName==='SECTION')")
                assert page.locator(".footer-documents a").count() == 3
                assert page.locator(".footer-email").get_attribute("href") == "mailto:support@sparkbook.kz"
                if locale == "ru" and width in (375,1440):
                    page.locator(".benefits").screenshot(path=str(OUT / f"benefits-{width}.png"), style=".site-header,.skip-link{visibility:hidden!important;}")
                    page.locator(".site-footer").screenshot(path=str(OUT / f"footer-{width}.png"), style=".site-header,.skip-link{visibility:hidden!important;}")
                language = page.locator(".language-switch summary")
                assert language.inner_text().strip() in language.get_attribute("aria-label")
                assert page.evaluate("""[...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.getAttribute('href').slice(1)))""")
                assert page.evaluate("""[...document.querySelectorAll('a,button,summary')].filter(e=>e.checkVisibility()&&!e.closest('[role=img]')).every(e=>e.getBoundingClientRect().height>=44)"""), "small target"
                page.locator("#features").scroll_into_view_if_needed()
                page.wait_for_function("""document.querySelector('.nav-links a[href="#features"]').getAttribute('aria-current')==='location'""")
                page.evaluate("scrollTo(0,0)")
                page.screenshot(path=str(OUT / f"{locale}-{width}.png"), full_page=True)
                page.locator("#tab-courses").focus()
                page.keyboard.press("ArrowDown")
                assert page.locator("#tab-quiz").get_attribute("aria-selected") == "true"
                assert page.locator("#demo-next").is_disabled()
                page.locator(".demo-option").nth(1).click()
                assert page.locator(".demo-option[aria-pressed=true]").count() == 1
                page.locator("#demo-next").click()
                assert page.locator("#demo-count").inner_text() == "2 / 2"
                assert page.locator(".option-label").all_text_contents() == ["50", "60", "70"]
                assert page.locator("#demo-next").is_disabled()
                assert page.evaluate("document.activeElement.id") == "demo-question"
                page.locator("#tab-progress").click()
                page.reload(wait_until="networkidle")
                page.wait_for_function("document.querySelector('#tab-progress').getAttribute('aria-selected') === 'true'")
                if width <= 850:
                    page.locator(".menu-toggle").click()
                    assert page.locator(".menu-toggle").get_attribute("aria-expanded") == "true"
                    page.locator('.nav-links a[href="#app"]').click()
                    assert page.locator(".menu-toggle").get_attribute("aria-expanded") == "false"
                    assert page.locator(".nav-links").evaluate("(e)=>e.inert")
                    assert page.url.endswith("#app")
                    assert page.evaluate("document.activeElement.id") == "app"
                else:
                    page.locator('.nav-links a[href="#faq"]').click()
                    assert page.url.endswith("#faq")
                    assert page.evaluate("document.activeElement.id") == "faq"
                assert page.evaluate("document.activeElement.getBoundingClientRect().top >= document.querySelector('.nav').getBoundingClientRect().bottom"), "anchor behind sticky nav"
                page.locator(".faq details").nth(1).locator("summary").focus()
                page.keyboard.press("Enter")
                assert page.locator(".faq details").nth(1).get_attribute("open") is not None
                page.locator(".hero-actions [data-open-view=quiz]").click()
                assert page.locator("#panel-quiz").is_visible()
                page.locator(".language-switch summary").click()
                assert page.locator('.language-options a[href="/ru"]').is_visible()
                page.keyboard.press("Escape")
                assert page.locator(".language-switch").get_attribute("open") is None
                assert page.locator(".qr-placeholder img").get_attribute("src").endswith("google-play-qr-mock.svg")
                assert page.locator(".download-preview a, .download-preview button").count() == 0
                assert not errors, errors
                print(f"{width}px {locale}: layout, images, anchors/focus, keyboard, quiz, deep links, QR OK")
                page.close()
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(BASE + "/en", wait_until="networkidle")
        page.wait_for_function("document.querySelector('.hero').classList.contains('hero-in-view')")
        floating = page.locator(".hero-object img").first
        assert floating.evaluate("(e)=>getComputedStyle(e).animationPlayState") == "running"
        toggle = page.locator(".hero-motion-toggle")
        toggle.focus(); page.keyboard.press("Enter")
        assert toggle.get_attribute("aria-pressed") == "true"
        assert floating.evaluate("(e)=>getComputedStyle(e).animationPlayState") == "paused"
        page.keyboard.press("Enter")
        assert toggle.get_attribute("aria-pressed") == "false"
        assert floating.evaluate("(e)=>getComputedStyle(e).animationPlayState") == "running"
        target = page.locator(".subject-card").first
        target.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        assert target.evaluate("(e)=>getComputedStyle(e).opacity") == "1"
        page.emulate_media(reduced_motion="reduce")
        assert page.locator(".reveal").first.evaluate("(e)=>getComputedStyle(e).opacity") == "1"
        page.locator(".language-switch summary").click()
        page.locator('.language-options a[href="/ru"]').click()
        page.wait_for_url("**/ru*")
        assert page.locator("html").get_attribute("lang") == "ru"
        page.close()
        fallback = browser.new_page(java_script_enabled=False, viewport={"width":1440,"height":900})
        fallback.goto(BASE + "/en")
        assert fallback.locator("h1").is_visible()
        assert fallback.locator(".hero-motion-toggle").is_hidden()
        assert fallback.locator(".hero-object img").first.evaluate("(e)=>getComputedStyle(e).animationPlayState") == "paused"
        assert "A fresh take" in fallback.locator("h1").inner_text()
        assert fallback.locator('.nav-links a[href="#app"]').is_visible()
        fallback.locator('.nav-links a[href="#faq"]').click()
        assert fallback.url.endswith("#faq")
        check_documents(browser)
        browser.close()
    print("Motion preference, locale navigation and JavaScript-free anchor/SSR fallback OK")

if __name__ == "__main__":
    main()
