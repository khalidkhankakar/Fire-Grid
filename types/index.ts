import { CardType } from "@/lib/db/schemas/card.schema";

export enum formResponseStatus {

    BOARD_FORKED = 'Board is forked',

    ADD_FAVORITE = 'Board is favorited',
    REMOVE_FAVORITE = 'You unfavorited the board',

    USER_NOT_EXISTS = 'user not exists',
    ORG_NOT_EXISTS = 'Please create an organization first',

    CARD_CREATED= 'card created',
    CARD_UPDATED= 'card updated',
    CARD_DELETED= 'card deleted',
    CARD_NOT_EXISTS = 'card not exists',
    CARD_INVALID_FIELDS = 'card invalid fields',

    TABLE_INVALID_FIELDS = 'table invalid fields',
    TABLE_CREATED = 'table created',
    TABLE_UPDATED = 'table updated',
    TABLE_DELETED = 'table deleted',
    TABLE_NOT_EXISTS = 'table not exists',


    BOARD_NOT_EXISTS = 'board not exists',
    BOARD_INVALID_FIELDS = 'board invalid fields',
    BOARD_CREATED = 'board created',
    BOARD_UPDATED = 'board updated',
    BOARD_DELETED = 'board deleted',
    BOARD_FETCHED = 'board fetched',
    ERROR = 'something went wrong',
}

export interface boardFromState {
    success: boolean,
    status: formResponseStatus.BOARD_INVALID_FIELDS | formResponseStatus.BOARD_CREATED | formResponseStatus.BOARD_UPDATED | formResponseStatus.BOARD_DELETED | formResponseStatus.BOARD_FETCHED | formResponseStatus.ERROR | formResponseStatus.USER_NOT_EXISTS | formResponseStatus.ORG_NOT_EXISTS | formResponseStatus.TABLE_INVALID_FIELDS | formResponseStatus.TABLE_CREATED | formResponseStatus.TABLE_UPDATED | formResponseStatus.TABLE_DELETED | formResponseStatus.BOARD_NOT_EXISTS | formResponseStatus.TABLE_NOT_EXISTS | formResponseStatus.CARD_CREATED | formResponseStatus.CARD_UPDATED | formResponseStatus.CARD_DELETED | formResponseStatus.CARD_NOT_EXISTS | formResponseStatus.CARD_INVALID_FIELDS | formResponseStatus.ADD_FAVORITE | formResponseStatus.REMOVE_FAVORITE | formResponseStatus.BOARD_FORKED
}


export type Table = {
    id: string;
    tableCards: CardType[];
    title: string;
    backgroundColor: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    position: number;
    boardId: string;
}


export type Board = {
    id: string;
title: string;
image: string;
createdAt: string;
createdBy: string;
category: string;
visibility: string;
type: string | null;
orgId: string | null;
isFavorite: boolean;
}

export type SearchParams = {
    type?: 'team' | 'favorite' | 'template'
    search?: string
    category?: string
    datetime?: string
    page?: string
    order?: string
  }
