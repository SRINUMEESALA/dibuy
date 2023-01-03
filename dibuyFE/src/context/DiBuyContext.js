import React from "react";

const DiBuyContext = React.createContext({
    selectedDesignsList: [],
    setSelectedDesignsList: () => { },
    categoriesList: [],
    setCategoriesList: () => { },
    namingCounter: 0,
    currentRoute: "",
    setCurrentRoute: () => { }
})
export default DiBuyContext