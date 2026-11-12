import Link from "next/link";
import { createJulegave, deleteJulegave, readJulegaver, updateJulegave } from "./actions";
import { ViewTransition } from "react";

type Props = {
  searchParams: Promise<{ sort: string | string[] }>
};

export default async function HomePage({ searchParams }: Props) {

  const params = await searchParams;
  const tillatteSorteringer = [
    "pris", "-pris", "betegnelse", "-betegnelse", "mottaker", "-mottaker"
  ];

  const sort =
    typeof params.sort === "string" &&
      tillatteSorteringer.includes(params.sort)
      ? params.sort
      : "-createdAt"

  const julegaver = await readJulegaver(sort);

  function getSorteringslink(felt: string) {
    return `/?sort=${sort === felt ? `-${felt}` : felt}`
  }

  return (
    <main>
      <h1>Julegave-lista 2026</h1>
      <form className="opprett-julegave-form" action={createJulegave}>
        <label>
          <span>Julegave</span>
          <input type="text" name="betegnelse" required />
        </label>
        <label>
          <span>Mottaker</span>
          <input type="text" name="mottaker" required />
        </label>
        <label>
          <span>Pris</span>
          <input type="number" name="pris" required />
        </label>
        <button type="submit">Legg til julegave</button>
      </form>
      <hr />
      <section className="julegaver">
        {
          julegaver.length === 0 ? (
            <p>Nissen har nok ikke vært her ennå</p>
          ) : (
            <section className="julegave-grid">
              <Link href={getSorteringslink("betegnelse")} id="julegave-heading" scroll={false}>
                <span className={sort.includes("betegnelse") ? "active" : ""}>
                  Julegave
                </span>{" "}
                {sort === "betegnelse"
                  ? "↑"
                  : sort === "-betegnelse"
                    ? "↓"
                    : "↑↓"}
              </Link>
              <Link href={getSorteringslink("mottaker")} id="mottaker-heading" scroll={false}>
                Mottaker
                {sort === 'mottaker' ? ' ↑' : sort === '-mottaker' ? ' ↓' : ' ⇅'}
              </Link>
              <Link href={getSorteringslink("pris")}>
                Pris
                {sort === 'pris' ? ' ↑' : sort === '-pris' ? ' ↓' : ' ⇅'}
              </Link>
              <span>Kjøpt</span>
              <span>Lagre julegave</span>
              <span>Slett julegave</span>
              {
                julegaver.map(gave => (
                  <ViewTransition key={gave.id}>
                    <article>
                      <form action={updateJulegave.bind(null, gave.id)}>
                        <input type="text" name="betegnelse" required defaultValue={gave.betegnelse} aria-labelledby="julegave-heading" />
                        <input type="text" name="mottaker" required defaultValue={gave.mottaker} aria-labelledby="mottaker-heading" />
                        <input type="number" name="pris" defaultValue={String(gave.pris)} />
                        <input type="checkbox" name="kjopt" defaultChecked={gave.kjopt} />
                        <button type="submit" title="Lagre endringer">💾</button>
                      </form>
                      <form action={deleteJulegave.bind(null, gave.id)}>
                        <button type="submit" title="Slett julegave">🗑</button>
                      </form>
                    </article>
                  </ViewTransition>
                ))
              }
            </section>
          )
        }
      </section>
    </main>
  )
}
