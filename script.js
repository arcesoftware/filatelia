document.addEventListener("DOMContentLoaded", function () {
    fetch("stamp.json")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("stampBody");

            data.forEach(stamp => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${stamp.id}</td>
                    <td>${stamp.name}</td>
                    <td>${stamp.country}</td>
                    <td>${stamp.year}</td>
                    <td><img src="${stamp.imageUrl}" alt="${stamp.name}" width="150"></td>
                `;
                tableBody.appendChild(row);
            });
        });

    // Filter functionality
    const filters = {
        filterID: 0,
        filterName: 1,
        filterCountry: 2,
        filterYear: 3
    };

    Object.keys(filters).forEach(filterID => {
        document.getElementById(filterID).addEventListener("keyup", function () {
            filterTable(filters[filterID], this.value.toLowerCase());
        });
    });

    function filterTable(colIndex, filterValue) {
        const rows = document.querySelectorAll("#stampTable tbody tr");

        rows.forEach(row => {
            const cell = row.cells[colIndex];
            if (cell) {
                row.style.display = cell.textContent.toLowerCase().includes(filterValue) ? "" : "none";
            }
        });
    }
});
