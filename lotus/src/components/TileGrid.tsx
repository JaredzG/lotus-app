import Tile from "./Tile";

const numbers: Array<string> = [];
for (let i = 0; i < 16; i++) {
  numbers.push(Math.ceil(Math.random() * 16).toString());
}

const TileGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2">
      {numbers.map((number) => (
        <Tile key={number} data={number} />
      ))}
    </div>
  );
};

export default TileGrid;
