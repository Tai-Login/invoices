import { setValueInvoice, setValueCustomer } from "./event.js";
import { getInvoices } from "./firebase.js";
export const renderCustomers = (data) => {
    totalResultCustomers.innerHTML = data.length;
    const html = data.map(
        (data) => `
    <li class="resultItem" data-id="${data && data.id}" data-name="${
            data && data.name
        }" data-note="${data && data.note}">
                                <div class="avatar">${
                                    data && data.name[0]
                                }</div>
                                <div class="userInfo">
                                    <span class="username">${
                                        data && data.name
                                    }</span>
                                    <span class="userNote"
                                        >${data && data.note}
                                    </span>
                                </div>
                            </li>`
    );
    resultCustomerList.innerHTML = html.join(" ");
    const resultItems = $$(
        ".page.searchContainer .searchWrap .searchResults .resultList .resultItem"
    );
    resultItems.forEach((item) => {
        item.addEventListener("click", () => {
            searchContainer.classList.remove("active");
            formAddCustomer.classList.add("active");
            formAddCustomer.dataset.id = item.dataset.id;
            getInvoices(formAddCustomer.dataset.id);
            setValueCustomer(item.dataset.id);
        });
    });
};

export const renderInvoices = (func) => {
    const data = func();
    totalResultInvoices.innerHTML = data.length;
    totalIntoMoney.innerHTML = data.reduce(
        (prev, price) => parseInt(prev) + parseInt(price.intoMoney),
        0
    );
    const html = data.map(
        (data) => `
        <li class="invoiceItem mb-10" data-id="${data.id}" data-invoiceId="${
            data.invoiceId
        }" data-intoMoney="${data.intoMoney}" data-date="${
            data.date
        }" data-note="${data.note}">
        <div class="invoiceInfo">
            <span class="invoiceId">${data.invoiceId}</span>
            <span class="invoiceCreatedAt">
                ${data.date}
            </span>
            <span class="invoiceNote"
                >${data.note || ""}</span
            >
        </div>
        <span class="intoMoney">${data.intoMoney}</span>
    </li>`
    );
    resultInvoiceList.innerHTML = html.join(" ");
    const resultItems = $$(".form.formCreate .invoiceList .invoiceItem");
    resultItems.forEach((item) => {
        item.addEventListener("click", () => {
            formInvoiceInfo.classList.add("active");
            formInvoiceInfo.dataset.id = item.dataset.id;
            setValueInvoice(item.dataset.id);
        });
    });
};
