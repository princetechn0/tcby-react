
const Tile = ({ src }) => {
  return (
    <div className="tile">
      <img src={src} />
    </div>
  );
};

function Masonry() {
    let brakePoints = [350, 500, 750];

    const [columns, setcolumns] = useState(1)

    useEffect(() => {
        this.onResize();
        window.addEventListener("resize", this.onResize);
    })


    getColumns(w) {
    return (
        brakePoints.reduceRight((p, c, i) => {
        return c < w ? p : i;
      }, brakePoints.length) + 1
    );
  }

  onResize() {
    const columns = this.getColumns(this.refs.Masonry.offsetWidth);
    if (columns !== this.state.columns) {
      this.setState({ columns: columns });
    }
  }

  mapChildren() {
    let col = [];
    const numC = this.state.columns;
    for (let i = 0; i < numC; i++) {
      col.push([]);
    }
    return this.props.children.reduce((p, c, i) => {
      p[i % numC].push(c);
      return p;
    }, col);
  }

    return (
      <div className="masonry" ref="Masonry">
        {this.mapChildren().map((col, ci) => {
          return (
            <div className="column" key={ci}>
              {col.map((child, i) => {
                return <div key={i}>{child}</div>;
              })}
            </div>
          );
        })}
      </div>
    );
}

render(<App brakePoints={brakePoints} />, app);
