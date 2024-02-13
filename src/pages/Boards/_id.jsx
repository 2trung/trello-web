import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
// import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailAPI,
  updateColumnDetailAPI,
  moveCardBetweenColumnsAPI,
  deleteColumnDetailAPI
} from '~/apis'
import { generatePlaceHolderCard } from '../../utils/formatter'
import { isEmpty } from 'lodash'
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'

function Board() {

  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '65c876f41d977747cbcc478c'

    fetchBoardDetailAPI(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceHolderCard(column)]
          column.cardOrderIds = [generatePlaceHolderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceHolderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceHolderCard(createdColumn)._id]

    const newBoard = { ...board }

    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceHolderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }
  const moveColumn = (newOrderedColumns) => {
    const newOrderedColumnsIds = newOrderedColumns.map(c => c._id)
    const newBoard = { ...board }

    newBoard.columns = newOrderedColumns
    newBoard.columnOrderIds = newOrderedColumnsIds
    setBoard(newBoard)

    updateBoardDetailAPI(board._id, { columnOrderIds: newOrderedColumnsIds })
  }
  const moveCardSameColumn = (newOrderedCard, newOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = newOrderedCard
      columnToUpdate.cardOrderIds = newOrderedCardIds
    }
    updateColumnDetailAPI(columnId, { cardOrderIds: newOrderedCardIds })
    setBoard(newBoard)
  }
  const moveCardBetweenColumnsBE = (currentCardId, prevColumnId, nextColumnId, orderedColumns) => {
    const newOrderedColumnsIds = orderedColumns.map(c => c._id)
    const newBoard = { ...board }

    newBoard.columns = orderedColumns
    newBoard.columnOrderIds = newOrderedColumnsIds
    setBoard(newBoard)

    let prevCardOrderIds = orderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardBetweenColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: orderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  const deleteColumn = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)
    deleteColumnDetailAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }
  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardSameColumn={moveCardSameColumn}
        moveCardBetweenColumnsBE={moveCardBetweenColumnsBE}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
