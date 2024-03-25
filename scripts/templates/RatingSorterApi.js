class RatingSorterApi {
    static async sorter(data, orderBy) {
        if (orderBy === 'date') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort(
                            (a, b) => new Date(a.date) - new Date(b.date))
                    }
                    resolve(result)
                }, 1000)
            })
        } else if (orderBy === 'popularity') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => b.likes - a.likes)
                    }
                    resolve(result)
                }, 1000)
            })
        } else if (orderBy === 'Titre') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort(function (a, b) {
                            return a.title.localeCompare(b.title);
                        }
                        )
                    }
                    resolve(result)
                }, 1000)
            })
        } else {
            throw 'unknow orderBy type'
        }
    }
}