import React, {useState} from 'react';
import Square from "./Square";

const Board = () => {
    const [items, setItems] = useState(Array(9).fill(null))
    let [count, setCount] = useState(1)
    let [winner, setWinner] = useState(null)

    function changeSquare(index) {
        let arr = items.slice()
        if (arr[index] === null && winner === null) {
            if (count % 2 === 1) arr[index] = "X"
            else arr[index] = "O"
            setCount(++count)
        }
        setItems(arr)
        setWinner(calculateWinner(arr))
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    function clear() {
        setWinner(null)
        setCount(1)
        setItems(Array(9).fill(null))
    }

    return (
        <div className={'container'}>
            <div className={'board'}>
            {items.map((item, index) =>
                <Square value={item} key={index} change={() => changeSquare(index)}/>
            )}

            </div>
            <div className={'container_1'}>
                {winner && <h1>Winner: {winner}</h1>}
                {winner && <button className={'restart'} onClick={clear}>Restart</button>}
            </div>
            </div>
    );
};

export default Board;