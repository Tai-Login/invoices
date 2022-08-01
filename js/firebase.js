// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    updateDoc,
    doc,
    where,
    query,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";
import { renderCustomers, renderInvoices } from "./templates.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjzkAuDtvWw2FmUY-pPz7DdI81aVzXTaE",
    authDomain: "invoices-20f4b.firebaseapp.com",
    projectId: "invoices-20f4b",
    storageBucket: "invoices-20f4b.appspot.com",
    messagingSenderId: "545765941031",
    appId: "1:545765941031:web:3d575d9872d22fceb8d302",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getDocuments = () => {
    // const querySnapshot = getDocs(collection(db, "customers")).then((db) =>
    //     console.log(db.docs[0].data())
    // );
    try {
        onSnapshot(collection(db, "customers"), (db) => {
            console.log(db.docs.map((doc) => doc.data()));
            renderCustomers(
                db.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });
    } catch (err) {
        alert("Lay thong tin khach hang loi");
    }
};

export const addCustomer = (name, note) => {
    try {
        addDoc(collection(db, "customers"), {
            name,
            note,
            created_at: new Date(),
        }).then((data) => {
            formAddCustomer.dataset.id = data.id;
        });
    } catch (e) {
        alert("Error: them khong thanh cong");
    }
};
export const deleteCustomer = (id) => {
    try {
        deleteDoc(doc(db, "customers", id)).then((data) => {
            btnCloseFormAddCustomer.click();
        });
    } catch (e) {
        alert("Error: xoa khong thanh cong");
    }
};

export const updateCustomer = (id, name, note) => {
    try {
        updateDoc(doc(db, "customers", id), {
            name,
            note,
        }).then(() => console.log("update done"));
    } catch (e) {
        alert("Error: cap nhat khong thanh cong");
    }
};

export const addNewInvoice = (id, invoiceId, intoMoney, date, note) => {
    try {
        addDoc(collection(db, "customers", id, "invoices"), {
            invoiceId,
            intoMoney,
            date,
            note,
            created_at: new Date(),
        }).then((data) => {});
    } catch (e) {
        alert("Error: them hoa don khong thanh cong");
    }
};

export const getInvoices = (id) => {
    try {
        onSnapshot(collection(db, "customers", id, "invoices"), (db) => {
            renderInvoices(() => {
                return db.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                });
            });
        });
    } catch (err) {
        alert("Lay thong tin hoa don loi");
    }
};

export const deleteInvoice = (id, idInvoice) => {
    try {
        deleteDoc(doc(db, "customers", id, "invoices", idInvoice)).then();
    } catch (e) {
        alert("Error: xoa khong thanh cong");
    }
};
export const updateInvoice = (
    id,
    idInvoice,
    invoiceId,
    intoMoney,
    date,
    note
) => {
    try {
        updateDoc(doc(db, "customers", id, "invoices", idInvoice), {
            invoiceId,
            intoMoney: intoMoney || 0,
            date,
            note,
        }).then(() => console.log("update done"));
    } catch (e) {
        alert("Error: cap nhat khong thanh cong");
    }
};

export const querySnapshot = (searchQuery) => {
    const q = getDocs(collection(db, "customers")).then((db) => {
        const data = db.docs.reduce((prev, doc) => {
            console.log(prev);
            if (
                doc
                    .data()
                    .name.toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) != -1 ||
                doc
                    .data()
                    .note.toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) != -1
            ) {
                return [...prev, { ...doc.data(), id: doc.id }];
            }
            return [...prev];
        }, []);

        renderCustomers(data);
    });
};

getDocuments();
