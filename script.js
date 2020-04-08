let data = [];
axios
  .get("http://localhost:3000/contacts")
  .then((response) => {
    console.log(response);
    const listHTML = document.querySelector("#contacts>ol");
    data = response.data;

    response.data.forEach((item) => {
      const { id, name, address, email, phone, company} = item;
      const itemHTML = `<li>
                Name: ${name}
                <br>
                Address: ${address}
                <br>
                Email: ${email}
                <br>
                Phone: ${phone}
                <br>
                Company: ${company}
                <br>
                <button class="btn btn-primary" onclick="edit(${id})"> <i class="far fa-edit"></i>edit</button>
                <button class="btn btn-primary" onclick="hapus(${id})"> <i class="far fa-trash-alt"></i> hapus</button>
            </li>`;
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
