var modalopen = document.querySelector(".box2");
var modalclose = document.querySelector(".close");
var modal = document.querySelector(".modal");

modalopen.addEventListener("click", function () {
  modal.style.display = "block";
});
modalclose.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

document
  .querySelector(".modalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    alert("제출되었습니다.");
    modal.style.display = "none";
  });

var modalForm = document.querySelector(".modalForm");

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var userIdvalue = document.querySelector(".userId").value;
  var contentvalue = document.querySelector("textarea.content").value;

  var newGuestBox = document.createElement("div");
  newGuestBox.classList.add("guestbox");

  newGuestBox.innerHTML = `
    <div class="title">
      <p>${userIdvalue}</p>
      <div class="action">
        <button class="edit">수정</button>
        <button class="delete">삭제</button>
      </div>
    </div>
    <div class="guestboxbox">
      <p class="guestcontent">${contentvalue}</p>
    </div>
  `;

  var additionalBoxes = document.querySelector(".additionalboxes");
  additionalBoxes.appendChild(newGuestBox);

  modalForm.reset();

  saveDataToLocalStorage();
});


window.addEventListener("load", function () {
  loadDataFromLocalStorage();
});

function saveDataToLocalStorage() {
  var additionalBoxes = document.querySelector(".additionalboxes");
  localStorage.setItem("guestBoxes", additionalBoxes.innerHTML);
}

function loadDataFromLocalStorage() {
  var additionalBoxes = document.querySelector(".additionalboxes");
  additionalBoxes.innerHTML = localStorage.getItem("guestBoxes");
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    var confirmDelete = confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      var guestBox = event.target.closest(".guestbox");
      if (guestBox) {
        var guestBoxId = guestBox.dataset.id;

        localStorage.removeItem(guestBoxId);

        guestBox.remove();

        saveDataToLocalStorage();
      }
    }
  }
});


document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit")) {
    var guestBox = event.target.closest(".guestbox");

    var editModal = document.querySelector(".editmodal");
    editModal.style.display = "block";

    var userId = guestBox.querySelector(".title p").textContent.trim();
    var content = guestBox.querySelector(".guestcontent").textContent.trim();

    var editedUserIdInput = document.querySelector(".edituserId");
    editedUserIdInput.value = userId;
    var editedContentInput = document.querySelector(".editcontent");
    editedContentInput.value = content;

    document.querySelector(".editmodalform").addEventListener("submit", function (event) {
      event.preventDefault();

      var editedUserId = editedUserIdInput.value.trim();
      var editedContent = editedContentInput.value.trim();

      var title = guestBox.querySelector(".title p");
      title.textContent = editedUserId;
      var guestContent = guestBox.querySelector(".guestcontent");
      guestContent.textContent = editedContent;

      saveDataToLocalStorage();

      editModal.style.display = "none";
    });

    document.querySelector(".closeeditmodal").addEventListener("click", function () {
      editModal.style.display = "none";
    });
  }
});