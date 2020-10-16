export const dateNormalize = (date) => {
    let convertedDate = new Date(Date.parse(date))
    let dateString = (convertedDate.getDate() < 10 ? '0' + convertedDate.getDate() : convertedDate.getDate())
        + '.' + (convertedDate.getMonth() + 1) + '.' + convertedDate.getFullYear()
    return dateString
}

export const dateAndTimeNormalize = (dateAndTime) => {
    let convertedDate = new Date(Date.parse(dateAndTime))
    let dateString = (convertedDate.getDate() < 10 ? '0' + convertedDate.getDate() : convertedDate.getDate())
        + '.' + (convertedDate.getMonth() + 1)
        + '.' + convertedDate.getFullYear()
        + ' в ' + convertedDate.getHours() + ':'
        + (convertedDate.getMinutes() < 10 ? '0' + convertedDate.getMinutes() : convertedDate.getMinutes())
    return dateString
}