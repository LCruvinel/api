window.onload = () => {
  const urlBase = "http://localhost:3000";

  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");
  const btnFU = document.getElementById("btnFindUsers");
  const btnLogout = document.getElementById("btnLogout");

  // Sair
  btnLogout.addEventListener("click", () => {
    const token = localStorage.token;
    if (token == undefined) {
      alert("Falta autenticação!");
      return;
    }
    return fetch(`${urlBase}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      })
      .then((result) => {
        console.log(result);
        if (!result.auth) {
          localStorage.removeItem("token");
          //document.getElementById("btnLogout").style.display = "none";
          window.location.replace("index.html");
        }
      });
  });

  // Encontrar um utilizador
  btnFU.addEventListener("click", () => {
    const token = localStorage.token;
    if (token == undefined) {
      alert("Falta autenticação!");
      return;
    }
    swal({
      title: "Find Users",
      html: '<input id="txtUser" class="swal2-input" placeholder="utente">',
      showCancelButton: true,
      confirmButtonText: "Pesquisar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const utente = document.getElementById("txtUser").value;
        return fetch(`${urlBase}/findUsers`, {
          method: "POST",
          body: `utente=${utente}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            swal.showValidationError(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        swal({ title: `${result.value.message}` });
      }
    });
  });

  // Autenticar
  btnLogin.addEventListener("click", () => {
    swal({
      title: "Acesso",
      html:
        '<input id="txtUser" class="swal2-input" placeholder="username">' +
        '<input id="txtPass" type="password" class="swal2-input" placeholder="password">',
      showCancelButton: true,
      confirmButtonText: "Validar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const user = document.getElementById("txtUser").value;
        const pass = document.getElementById("txtPass").value;
        return fetch(`${urlBase}/loginUser`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: `username=${user}&password=${pass}`,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            swal.showValidationError(`Pedido falhado: ${error}`);
          });
      },
      allowOutsideClick: () => !swal.isLoading(),
    }).then((result) => {
      swal({ title: `${result.value.message}` });
      console.log(result.value.favoritos);
      if (result.value.auth) {
        const token = result.value.token;
        localStorage.setItem("token", token);
        document.getElementById("btnLogout").style.display = "inline";
        if (result.value.admin) {
          // O replace abaixo é só exemplo para ver funcionar,
          // não fazer o replace aqui, fazer o redirect no servidor!!!
          window.location.replace("admin.html");
        }
      }
    });
  });

  // Registar
  btnRegister.addEventListener("click", () => {
    swal({
      title: "Novo Registo",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="first_name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="last_name">' +
        '<input id="swal-input3" class="swal2-input" placeholder="e-mail">' +
        '<input id="swal-input4" class="swal2-input" placeholder="username">' +
        '<input id="swal-input5" class="swal2-input" placeholder="password" type="password">',
      showCancelButton: true,
      confirmButtonText: "Registar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const first_name = document.getElementById("swal-input1").value;
        const last_name = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const username = document.getElementById("swal-input4").value;
        const password = document.getElementById("swal-input5").value;
        return fetch(`${urlBase}/registerUser`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            first_name: `${first_name}`,
            last_name: `${last_name}`,
            email: `${email}`,
            username: `${username}`,
            password: `${password}`,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            swal.showValidationError(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !swal.isLoading(),
    }).then((result) => {
      swal({ title: `${result.value.message}` });
    });
  });

  /* 
  Obter os livros do servidor
*/
  (async () => {
    localStorage.clear();
    const renderBooks = document.getElementById("renderBooks");
    let txtBooks = "";
    const response = await fetch(`${urlBase}/allbooks`);
    const books = await response.json();

    for (const book of books) {
      txtBooks += `
    <div class="col-sm-4">
      <div class="team-member">      
        <img id="${book.Id}" class="mx-auto rounded-circle viewBook" src="${book.BookPhoto}" alt="">
        <h4>${book.BookTitle}</h4>
        <p class="text-muted">${book.AuthorName}</p>`;
      txtBooks += `                
      </div>
    </div>
    `;
    }
    renderBooks.innerHTML = txtBooks;
  })();
};
