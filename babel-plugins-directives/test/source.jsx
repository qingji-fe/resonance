var showA = true;
var showB = false;
const A = () => {
  return (
    <div>
      babel插件
      <div qj-if={showA}>show: A</div>
      <div qj-if={showB}>show: B</div>
    </div>
  );
};
