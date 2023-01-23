import {
    columnsStateType,
    filterStateType,
    singleColumnSettingsType
} from "./types"

export const readColumnSettings = (columnOptions = []) : [singleColumnSettingsType[], columnsStateType] => {

    let columns: (singleColumnSettingsType | undefined)[] = []
    let sort: (false | {column: number, dir: "asc" | "desc"}) = false
    const filters: (filterStateType | undefined )[] = []

    // Check for the columns option

    columnOptions.forEach(data => {

        // convert single column selection to array
        const columnSelectors = Array.isArray(data.select) ? data.select : [data.select]

        columnSelectors.forEach((selector: number) => {
            if (!columns[selector]) {
                columns[selector] = {
                    type: data.type || "string",
                    sortable: true,
                    searchable: true
                }
            }
            const column = columns[selector]


            if (data.render) {
                column.render = data.render
            }

            if (data.format) {
                column.format = data.format
            }

            if (data.cellClass) {
                column.cellClass = data.cellClass
            }

            if (data.headerClass) {
                column.headerClass = data.headerClass
            }

            if (data.locale) {
                column.locale = data.locale
            }

            if (data.sortable === false) {
                column.sortable = false
            } else {
                if (data.numeric) {
                    column.numeric = data.numeric
                }
                if (data.caseFirst) {
                    column.caseFirst = data.caseFirst
                }
            }

            if (data.searchable === false) {
                column.searchable = false
            } else {
                if (data.sensitivity) {
                    column.sensitivity = data.sensitivity
                }
            }

            if (column.searchable || column.sortable) {
                if (data.ignorePunctuation) {
                    column.ignorePunctuation = data.ignorePunctuation
                }
            }

            if (data.hidden) {
                column.hidden = true
            }

            if (data.filter) {
                column.filter = data.filter
            }

            if (data.sortSequence) {
                column.sortSequence = data.sortSequence
            }

            if (data.sort) {
                if (data.filter) {
                    filters[selector] = data.sort
                } else {
                    // We only allow one. The last one will overwrite all other options
                    sort = {column: selector,
                        dir: data.sort}
                }
            }

        })


    })

    columns = columns.map(column => column ?
        column :
        {type: "string",
            sortable: true,
            searchable: true})

    const widths = [] // Width are determined later on by measuring on screen.

    return [
        columns, {filters,
            sort,
            widths}
    ]

}
