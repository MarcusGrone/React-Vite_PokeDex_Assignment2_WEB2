export default function PaginationControls({ totalPages, currentPage, onPageChange }) {
    return (
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            style={{
              margin: "0.25rem",
              padding: "0.5rem 1rem",
              border: "1px solid gray",
              borderRadius: "4px",
              backgroundColor: currentPage === i ? "#007bff" : "white",
              color: currentPage === i ? "white" : "black",
              cursor: "pointer"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )
  }
  