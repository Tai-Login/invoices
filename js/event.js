import {
    addCustomer,
    deleteCustomer,
    addNewInvoice,
    getInvoices,
    deleteInvoice,
    updateInvoice,
    updateCustomer,
    querySnapshot,
} from "./firebase.js";

btnAddCustomer.addEventListener("click", () => {
    searchContainer.classList.remove("active");
    formAddCustomer.classList.add("active");
    const id = formAddCustomer.dataset.id;
    if (id == "" || id == undefined) {
    } else {
        getInvoices(id);
    }
});

// close form add customer
btnCloseFormAddCustomer.addEventListener("click", () => {
    formAddCustomer.classList.remove("active");
    searchContainer.classList.add("active");
    formAddCustomer.dataset.id = "";
    resultInvoiceList.innerHTML = "";
    fieldNameNewCustomer.value = "";
    fieldNoteNewCustomer.value = "";
});

// add new invoice

btnAddInvoice.addEventListener("click", () => {
    const invoiceId = formInvoiceInfo.dataset.id;
    if (invoiceId) setValueInvoice(invoiceId);
    formInvoiceInfo.classList.add("active");
});

// close invoice info
btnCloseInvoiceInfo.addEventListener("click", () => {
    formInvoiceInfo.classList.remove("active");
    formInvoiceInfo.dataset.id = "";
    fieldInvoiceId.value = "HD00";
    fieldIntoMoney.value = "";
    fieldInvoiceCreatedAt.value = "";
    fieldInvoiceNote.value = "";
});

// add new customer
btnAddNewCustomer.addEventListener("click", () => {
    const id = formAddCustomer.dataset.id;
    const name = fieldNameNewCustomer.value;
    const note = fieldNoteNewCustomer.value;
    if (!id) addCustomer(name, note);
    else updateCustomer(id, name, note);
    alert("Cap nhat thanh cong");
});

btnDeleteCustomer.addEventListener("click", () => {
    const id = formAddCustomer.dataset.id;
    if (confirm("Xóa khách hàng này.")) deleteCustomer(id);
});

btnAddNewInvoice.addEventListener("click", () => {
    const id = formAddCustomer.dataset.id;
    const invoiceId = formInvoiceInfo.dataset.id;
    if (id) {
        if (invoiceId) {
            updateInvoice(
                id,
                invoiceId,
                fieldInvoiceId.value,
                fieldIntoMoney.value,
                fieldInvoiceCreatedAt.value,
                fieldInvoiceNote.value
            );
        } else {
            addNewInvoice(
                id,
                fieldInvoiceId.value,
                fieldIntoMoney.value,
                fieldInvoiceCreatedAt.value,
                fieldInvoiceNote.value
            );
        }
    } else {
        alert("Khong co id");
    }
    btnCloseInvoiceInfo.click();
    fieldInvoiceId.value = "HD00";
    fieldIntoMoney.value = "";
    fieldInvoiceCreatedAt.value = "";
    fieldInvoiceNote.value = "";
});

btnDeleteInvoice.addEventListener("click", () => {
    const id = formAddCustomer.dataset.id;
    const idInvoice = formInvoiceInfo.dataset.id;
    btnCloseInvoiceInfo.click();
    if (confirm("Xóa hóa đơn này.")) deleteInvoice(id, idInvoice);
});
let timer;
fieldSearchCustomer.addEventListener("keyup", (e) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        querySnapshot(e.target.value);
    }, 300);
});

export const setValueInvoice = (id) => {
    const node = resultInvoiceList.querySelector(`li[data-id='${id}']`);
    fieldInvoiceId.value = node.dataset.invoiceid;
    fieldIntoMoney.value = node.dataset.intomoney;
    fieldInvoiceCreatedAt.value = node.dataset.date;
    fieldInvoiceNote.value = node.dataset.note;
};
export const setValueCustomer = (id) => {
    const node = resultCustomerList.querySelector(`li[data-id='${id}']`);
    fieldNameNewCustomer.value = node.dataset.name;
    fieldNoteNewCustomer.value = node.dataset.note;
};
