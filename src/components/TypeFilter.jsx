export default function TypeFilter({ types, selectedType, onTypeSelect }) {
    return (
      <aside style={{ width: "100%", maxWidth: "300px", marginRight: "1rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Filter by Type</h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
          }}
        >
          <li>
            <button
              onClick={() => onTypeSelect("all")}
              style={{
                fontWeight: selectedType === "all" ? "bold" : "normal",
                width: "100%",
              }}
            >
              All
            </button>
          </li>
          {types.map((type) => (
            <li key={type}>
              <button
                onClick={() => onTypeSelect(type)}
                style={{
                  fontWeight: selectedType === type ? "bold" : "normal",
                  width: "100%",
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    )
  }
  