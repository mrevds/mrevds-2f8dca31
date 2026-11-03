/* Chapter title page: a drawing on a colored plate, the number, the title and how it is told */
type Props = {
  n: number;
  title: string;
  sub: string;
  genre: string;
  plate: string;
  drawing: React.ReactNode;
  dark?: boolean;
};

const Chapter = ({ n, title, sub, genre, plate, drawing, dark }: Props) => (
  <header className="divider">
    <div className={`plate${dark ? " plate-dark" : ""}`} style={{ background: plate }}>
      {drawing}
    </div>
    <div>
      <div className="ch-no">Chapter {String(n).padStart(2, "0")}</div>
      <h2>{title}</h2>
      <p className="ch-sub">{sub}</p>
    </div>
    <span className="genre">told as {genre}</span>
  </header>
);

export default Chapter;
