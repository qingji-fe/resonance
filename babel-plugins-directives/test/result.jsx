var showA = true;
var showB = false;

const A = () => {
  return <div>
      babel插件
      {showA ? <div>show: A</div> : null}
      {showB ? <div>show: B</div> : null}
    </div>;
};