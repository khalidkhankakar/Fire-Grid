export enum formResponseStatus  {

    USER_NOT_EXISTS='user not exists',
    
    ORG_NOT_EXISTS='Please create an organization first',

    BOARD_INVALID_FIELDS='board invalid fields',
    BOARD_CREATED='board created',
    BOARD_UPDATED='board updated',
    BOARD_DELETED='board deleted',
    BOARD_FETCHED='board fetched',
    BOARD_ERROR='something went wrong',
}

export interface boardFromState  {
    success:boolean,
    status:formResponseStatus.BOARD_INVALID_FIELDS | formResponseStatus.BOARD_CREATED | formResponseStatus.BOARD_UPDATED | formResponseStatus.BOARD_DELETED | formResponseStatus.BOARD_FETCHED | formResponseStatus.BOARD_ERROR | formResponseStatus.USER_NOT_EXISTS | formResponseStatus.ORG_NOT_EXISTS
}