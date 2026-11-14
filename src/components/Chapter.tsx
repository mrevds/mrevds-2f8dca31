/* Chapter title page: a drawing on a colored plate, the number, the title and how it is told */
type Props = {
  label: string;
  title: string;
  sub: string;
  genre: string;
  plate: string;
  drawing: React.ReactNode;
  dark?: boolean;
};

const Chapter = ({ label, title, sub, genre, plate, drawing, dark }: Props) => (
  <header className="divider">
    <div className={`plate${dark ? " plate-dark" : ""}`} style={{ background: plate }}>
      {drawing}
    </div>
    <div>
      <div className="ch-no">{label}</div>
      <h2>{title}</h2>
      <p className="ch-sub">{sub}</p>
    </div>
    <span className="genre">told as {genre}</span>
  </header>
);

export default Chapter;
