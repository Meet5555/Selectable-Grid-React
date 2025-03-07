import SelectableGrid from "./components/selectable-grid";

function App() {
  return (
    <div className="bg-cyan-100 h-screen p-10 w-screen mx-auto text-center">
      <h1 className="text-3xl font-bold my-10">Selectable Grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
