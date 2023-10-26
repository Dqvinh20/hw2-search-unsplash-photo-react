function splitToNChunks(array, n) {
  let result = [];
  for (let i = n; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

function GridImageList({ images }) {
  const gridImages = splitToNChunks([...images], 4);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {gridImages.map((col, index) => (
        <div className="grid gap-4" key={index}>
          {col.map((item) => (
            <div key={item.id}>
              <a
                href={item.links.html}
                target="_blank"
                rel="noopener noreferrer">
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={item.urls.regular}
                  alt={item.alt_description}
                />
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GridImageList;
