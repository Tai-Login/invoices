const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchContainer = $(".page.searchContainer");
const formAddCustomer = $(".formCreateModel");
const formInvoiceInfo = $(".form.invoiceInfo.model");
const resultCustomerList = $(
    ".page.searchContainer .searchWrap .searchResults .resultList"
);
const resultInvoiceList = $(".form.formCreate .invoiceList");

const btnAddCustomer = $(".btnAddCustomer");
const btnCloseFormAddCustomer = $(
    ".form.formCreate .formCreateHeader .closeFormCreate"
);
const btnAddInvoice = $(".form.formCreate .addInvoice");
const btnAddNewInvoice = $(
    ".form.invoiceInfo.model .invoiceInfoContent .formInvoiceButton .btnInvoiceConfirm"
);
const btnCloseInvoiceInfo = $(
    ".form.invoiceInfo.model .formInvoiceHeader .btnInvoiceClose"
);
const btnAddNewCustomer = $(".formCreate .addNewCustomer.btn");
const btnDeleteCustomer = $(".formCreate .addDeleteCustomer.btn");
const btnDeleteInvoice = $(
    ".form.invoiceInfo.model .invoiceInfoContent .formInvoiceButton .btnInvoiceDelete"
);

// input

const fieldSearchCustomer = $("#searchField");
const fieldNameNewCustomer = $(".formCreate .resultItem .userInfo .username");
const fieldNoteNewCustomer = $(".formCreate .resultItem .userInfo .userNote");

const fieldInvoiceId = formInvoiceInfo.querySelector("input[name='invoiceId']");
const fieldIntoMoney = formInvoiceInfo.querySelector("input[name='intoMoney']");
const fieldInvoiceCreatedAt = formInvoiceInfo.querySelector(
    "input[name='invoiceCreatedAt']"
);
const fieldInvoiceNote = formInvoiceInfo.querySelector(
    "textarea[name='invoiceNote']"
);

const totalResultCustomers = $("#totalResultCustomers");
const totalResultInvoices = $("#totalResultInvoices");
const totalIntoMoney = $("#totalIntoMoney");
