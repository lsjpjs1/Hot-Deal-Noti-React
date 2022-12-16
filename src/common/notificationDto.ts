export interface PostKeywordRequest {
    keyword: string,
    minPrice: number,
    maxPrice: number
}

export interface NotificationKeyword {
    keywordNotificationId: number,
    keywordNotificationBody: string,
    keywordNotificationTime: string,
    minPrice: number,
    maxPrice: number
}

export interface KeywordNotification {
    notificationId: number,
    notificationTime: string,
    notificationType: string,
    notificationItemId: number
    accountId: number,
    notificationTitle: string,
    notificationBody: string,
    isRead: boolean
}