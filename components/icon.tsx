export function Icon({ name }: { name: string }) {
  return <svg className="icon" aria-hidden="true"><use href={`/assets/icons.svg#${name}`} /></svg>;
}
