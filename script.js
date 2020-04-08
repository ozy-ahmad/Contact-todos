let data = [];
axios
    .get("http://localhost:3000/contacts")
    .then((response) => {
        console.log(response);
        const listHTML = document.getElementById("contacts");
        data = response.data;

        response.data.forEach((item) => {
            const {
                id,
                name,
                address,
                email,
                phone,
                company
            } = item;
            const itemHTML = `<tr>
        <th id='contacts' scope="row">${id}</td>
                <td>${name}</td> 
          <td>${address} </td>         
        <td>${email} </td>
         <td> ${phone}</td>       
                <td> ${company}</td> 
              <td>  <button  class="btn btn-primary" onclick="edit(${id})"> <i class="far fa-edit id= "buttonstyle""></i></button>
                <button class="btn btn-danger" onclick="hapus(${id})"> <i class="far fa-trash-alt id= "buttonstyle""></i> </button>
                </td>
            </tr>`;
            listHTML.innerHTML += itemHTML;
        });
    })
    .catch((pesanError) => {
        console.error(pesanError);
    });
document
    .getElementById("simpanContact")
    .addEventListener("click", function (event) {
        const name = document.getElementsByName("name")[0].value;
        const address = document.getElementsByName("address")[0].value;
        const email = document.getElementsByName("email")[0].value;
        const phone = document.getElementsByName("phone")[0].value;
        const company = document.getElementsByName("company")[0].value;
        axios.post("http://localhost:3000/contacts", {
            name,
            address,
            email,
            phone,
            company,
        });
    });

const hapus = (id) => {
    axios.delete(`http://localhost:3000/contacts/${id}`);
};

const edit = (id) => {
    const contact = data.find((item) => {
        return item.id === id;
    });

    if (contact) {
        const name = window.prompt("Name", contact.name);
        const address = window.prompt("Adress", contact.address);
        const email = window.prompt("Email", contact.address);
        const phone = window.prompt("Phone", contact.phone);
        const company = window.prompt("company", contact.company);
        axios.put(`http://localhost:3000/contacts/${id}`, {
            name,
            address,
            email,
            phone,
            company,
        });
    }
};