declare namespace AppTypes {
  export type ButtonTypes = 'success' | 'info' | 'default' | 'error'
  export type TextStyle = 'default' | 'error'

  export interface User {
    avatarUrl: string | null
    username: string
    id: string
    subscribers: string[]
    subscribing: string[]
  }

  export interface Comment {
    user: Partial<User>
    content: string
    createdAt: Date
  }

  export interface FeedImage {
    imageUrl: string
    imageWidth: number
    imageHeight: number
    description: string
    likes: number
    isLiked: boolean
  }

  export interface FeedImageData {
    image: FeedImage
    user: User
    id: string
    createdAt: number
  }
}
