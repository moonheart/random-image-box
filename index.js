function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function addWeightedItemInArray(array) {
    let weight = 0.7
    let index = Math.round(array.length * weight)
    let cut = Math.min(index, array - index)
    let tempArray = []
    for(let i = index; i < array.length; i++) {
        for(let j = 0; j < array.length - i + index - cut; j++) {
            tempArray.push(array[i])
        }
    }
    for(let i = index -1; i >= 0; i--) {
        for(let j = 0; j < array.length - index + i - cut; j++) {
            tempArray.push(array[i])
        }
    }
    return array.concat(tempArray)
}

function init2DArray(height, width) {
    let map = []
    for (let i = 0; i < height; i++) {
        map[i] = []
        for (let j = 0; j < width; j++) {
            map[i][j] = 0
        }
    }
    return map
}

function is2DArrayFull(map) {
    for (let i in map) {
        for (let j in map[i]) {
            if (map[i][j] == 0) {
                return false
            }
        }
    }
    return true
}

function findEmptyXsIn2DArray(map) {
    let xs = []
    for (let i in map) {
        for (let j in map[i]) {
            if (map[i][j] == 0) {
                xs.push(i)
                break
            }
        }
    }
    // return xs
    return addWeightedItemInArray(xs)
}

function findEmptyYsIn2DArray(map, x) {
    let ys = []
    for (let i in map[x]) {
        if (map[x][i] == 0) {
            ys.push(i)
        }
    }
    // return ys
    return addWeightedItemInArray(ys)
}

function findEmptyXsIn2DArrayStartFromIndex(map, startX, startY) {
    let xs = []
    for (let i = startX; i < map.length; i++) {
        if (map[i][startY] == 0) {
            xs.push(i)
            continue
        }
        break
    }
    // return xs
    return addWeightedItemInArray(xs)
}

function findEmptySquareIn2DArrayStartFromXAndY(map, startX, startY) {
    let xys = []
    for (let x = startX, y = startY; x < map.length && y < map[x].length; x++, y++) {
        let smallArray = []
        for (let x1 = startX; x1 <= x; x1++) {
            for (let y1 = startY; y1 <= y; y1++) {
                smallArray.push(map[x1][y1])
            }
        }
        if (smallArray.some(item => item != 0)) {
            break
        }
        xys.push([x, y])
    }
    // return xys
    return addWeightedItemInArray(xys)
}

function findEnptyYsIn2DArrayStartFromIndex(map, startX, startY, endX) {
    let ys = []
    for (let y = startY; y <= map[endX].length; y++) {
        let smallArray = []
        for (let x = startX; x <= endX; x++) {
            smallArray.push(map[x][y])
        }
        if (smallArray.some(item => item != 0)) {
            break
        }
        ys.push(y)
    }
    // return ys
    return addWeightedItemInArray(ys)
}

function getRamdomItemFromArray(array) {
    let index = getRandomInt(0, array.length)
    return array[index]
}

function initTableInHtml(height, width) {
    let tableMap = init2DArray(height, width)
    let table = document.getElementById('table')
    for (let i = 0; i < height; i++) {
        let tr = table.insertRow(i)
        for (let j = 0; j < width; j++) {
            let td = tr.insertCell(j)
            tableMap[i][j] = td
        }
    }
    return tableMap
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setBackgroud(ele) {
    ele.style.backgroundImage = `url('https://www.dmoe.cc/random.php?t=${Math.random()}')`
    // ele.style.backgroundImage = `url('https://picsum.photos/400/300/?t=${Math.random()}')`
    ele.style.backgroundSize = 'cover'
}

async function main() {
    let height = 10
    let width = 15
    let tableMap = initTableInHtml(height, width)
    let map = init2DArray(height, width)

    while (!is2DArrayFull(map)) {
        let startXs = findEmptyXsIn2DArray(map)
        let startX = getRamdomItemFromArray(startXs)
        let startYs = findEmptyYsIn2DArray(map, startX)
        let startY = getRamdomItemFromArray(startYs)

        // let endXs = findEmptyXsIn2DArrayStartFromIndex(map, startX, startY)
        // let endX = getRamdomItemFromArray(endXs)
        // console.log({ endX, endXs })
        // let endYs = findEnptyYsIn2DArrayStartFromIndex(map, startX, startY, endX)
        // let endY = getRamdomItemFromArray(endYs)

        let endXys = findEmptySquareIn2DArrayStartFromXAndY(map, startX, startY)
        let endXy = getRamdomItemFromArray(endXys)
        let endX = endXy[0]
        let endY = endXy[1]

        let r = Math.random()

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                map[x][y] = r
                if (x == startX && y == startY) {
                    console.log({ rowSpan: endX - startX + 1, colSpan: endY - startY + 1 })
                    // tableMap[x][y].innerHTML = r
                    tableMap[x][y].rowSpan = endX - startX + 1
                    tableMap[x][y].colSpan = endY - startY + 1
                    setBackgroud(tableMap[x][y])
                    continue
                } else {
                    tableMap[x][y].remove()
                }
            }
        }
        // await sleep(100)
    }
    console.log(map)
}

main()