# Blog Platform — Database Schema

When there is any changes into database, please run 2 following command

```bash
npx prisma migrate dev --name <name - similar to commit> # similar to commit in git

npx prisma generate # similar with push in git

```

## ENUMs

Shared enums used across multiple tables:

| Enum               | Values                                 | Description                |
| ------------------ | -------------------------------------- | -------------------------- |
| `Role`             | `reader`, `writer`, `admin`            | User permission level      |
| `PostStatus`       | `draft`, `published`, `archived`       | Post visibility state      |
| `ReactionType`     | `like`, `love`, `insightful`, `funny`  | Type of reaction on a post |
| `NotificationType` | `like`, `comment`, `follow`, `mention` | Type of notification event |

---

## 1. users

| Field           | Type                                         | Description                                                                 |
| --------------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `id`            | `String` `@id` `@default(uuid())` `@db.Uuid` | Primary key, auto-generated UUID                                            |
| `email`         | `String` `@unique` `@db.VarChar(255)`        | Login email, must be unique                                                 |
| `name`          | `String` `@db.VarChar(100)`                  | Display name, defaults to `user01` on registration                          |
| `nickname`      | `String?` `@unique`                          | Friendly name used for @mention tagging, nullable as it is not required     |
| `avatarUrl`     | `String?` `@db.Text`                         | URL of the uploaded avatar image, nullable                                  |
| `role`          | `Role` `@default(writer)`                    | Permission level, defaults to `writer` on registration                      |
| `passwordHash`  | `String?` `@db.Text`                         | Hashed password, nullable because OAuth users have no password              |
| `oauthProvider` | `String?`                                    | OAuth provider name: `google` or `github`, nullable for email registrations |
| `oauthId`       | `String?`                                    | User ID returned by the OAuth provider, nullable for same reason            |
| `isBanned`      | `Boolean` `@default(false)`                  | Flag set by admin to ban the account                                        |
| `createdAt`     | `DateTime` `@default(now())`                 | Timestamp when the account was created                                      |
| `updatedAt`     | `DateTime` `@updatedAt`                      | Auto-updated whenever the record changes                                    |

---

## 2. posts

| Field                | Type                              | Description                                                              |
| -------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `id`                 | `String` `@id` `@default(uuid())` | Primary key                                                              |
| `authorId`           | `String` `@db.Uuid`               | FK referencing `users.id`                                                |
| `title`              | `String` `@db.VarChar(255)`       | Post title                                                               |
| `slug`               | `String` `@unique`                | URL-friendly version of the title, unique to serve as the URL identifier |
| `content`            | `String` `@db.Text`               | Post body content, uses `Text` for unlimited length                      |
| `status`             | `PostStatus` `@default(draft)`    | Post state, defaults to `draft` on creation                              |
| `thumbnailUrl`       | `String?` `@db.Text`              | Cover image URL, nullable                                                |
| `readingTimeMinutes` | `Int` `@default(0)`               | Estimated reading time calculated from content length                    |
| `viewCount`          | `Int` `@default(0)`               | Denormalized view counter for fast querying                              |
| `publishedAt`        | `DateTime?`                       | Timestamp when the post was published, nullable because drafts have none |
| `createdAt`          | `DateTime` `@default(now())`      | Timestamp when the post was created                                      |
| `updatedAt`          | `DateTime` `@updatedAt`           | Auto-updated whenever the post is edited                                 |

---

## 3. categories

| Field  | Type                              | Description                                                 |
| ------ | --------------------------------- | ----------------------------------------------------------- |
| `id`   | `String` `@id` `@default(uuid())` | Primary key                                                 |
| `name` | `String` `@unique`                | Category name, must be unique                               |
| `slug` | `String` `@unique`                | URL-friendly name, used for routes like `/category/backend` |

---

## 4. tags

| Field  | Type                              | Description                                           |
| ------ | --------------------------------- | ----------------------------------------------------- |
| `id`   | `String` `@id` `@default(uuid())` | Primary key                                           |
| `name` | `String` `@unique`                | Tag name, must be unique                              |
| `slug` | `String` `@unique`                | URL-friendly name, used for routes like `/tag/nodejs` |

---

## 5. post*categories *(junction)\_

| Field                        | Type                | Description                                                   |
| ---------------------------- | ------------------- | ------------------------------------------------------------- |
| `postId`                     | `String` `@db.Uuid` | FK referencing `posts.id`                                     |
| `categoryId`                 | `String` `@db.Uuid` | FK referencing `categories.id`                                |
| `@@id([postId, categoryId])` | composite PK        | Prevents a post from being assigned the same category twice   |
| `onDelete: Cascade`          | —                   | Deleting a post or category removes this record automatically |

---

## 6. post*tags *(junction)\_

| Field                   | Type                | Description                                              |
| ----------------------- | ------------------- | -------------------------------------------------------- |
| `postId`                | `String` `@db.Uuid` | FK referencing `posts.id`                                |
| `tagId`                 | `String` `@db.Uuid` | FK referencing `tags.id`                                 |
| `@@id([postId, tagId])` | composite PK        | Prevents a post from being assigned the same tag twice   |
| `onDelete: Cascade`     | —                   | Deleting a post or tag removes this record automatically |

---

## 7. comments

| Field       | Type                              | Description                                                                                    |
| ----------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `id`        | `String` `@id` `@default(uuid())` | Primary key                                                                                    |
| `postId`    | `String` `@db.Uuid`               | FK referencing `posts.id`                                                                      |
| `userId`    | `String` `@db.Uuid`               | FK referencing `users.id`                                                                      |
| `content`   | `String` `@db.Text`               | Comment body text                                                                              |
| `isDeleted` | `Boolean` `@default(false)`       | Soft delete flag — hides the comment without removing it, preserving related notification data |
| `createdAt` | `DateTime` `@default(now())`      | Timestamp when the comment was posted                                                          |
| `updatedAt` | `DateTime` `@updatedAt`           | Timestamp of the last edit                                                                     |

---

## 8. reactions

| Field                        | Type                              | Description                                                                   |
| ---------------------------- | --------------------------------- | ----------------------------------------------------------------------------- |
| `id`                         | `String` `@id` `@default(uuid())` | Primary key                                                                   |
| `postId`                     | `String` `@db.Uuid`               | FK referencing `posts.id`                                                     |
| `userId`                     | `String` `@db.Uuid`               | FK referencing `users.id`                                                     |
| `type`                       | `ReactionType` `@default(like)`   | Type of reaction                                                              |
| `createdAt`                  | `DateTime` `@default(now())`      | Timestamp when the reaction was given                                         |
| `@@unique([postId, userId])` | —                                 | A user can only react once per post; use `upsert` to change the reaction type |

---

## 9. bookmarks

| Field                        | Type                              | Description                                         |
| ---------------------------- | --------------------------------- | --------------------------------------------------- |
| `id`                         | `String` `@id` `@default(uuid())` | Primary key                                         |
| `userId`                     | `String` `@db.Uuid`               | FK referencing `users.id`                           |
| `postId`                     | `String` `@db.Uuid`               | FK referencing `posts.id`                           |
| `createdAt`                  | `DateTime` `@default(now())`      | Timestamp when the post was saved                   |
| `@@unique([userId, postId])` | —                                 | A user cannot bookmark the same post more than once |

---

## 10. follows _(self-relation)_

| Field                             | Type                         | Description                                          |
| --------------------------------- | ---------------------------- | ---------------------------------------------------- |
| `followerId`                      | `String` `@db.Uuid`          | FK → `users.id`, the user who is following           |
| `followingId`                     | `String` `@db.Uuid`          | FK → `users.id`, the user being followed             |
| `createdAt`                       | `DateTime` `@default(now())` | Timestamp when the follow occurred                   |
| `@@id([followerId, followingId])` | composite PK                 | Prevents duplicate follows; A can only follow B once |

---

## 11. notifications

| Field         | Type                              | Description                                                                        |
| ------------- | --------------------------------- | ---------------------------------------------------------------------------------- |
| `id`          | `String` `@id` `@default(uuid())` | Primary key                                                                        |
| `recipientId` | `String` `@db.Uuid`               | FK → `users.id`, the user receiving the notification                               |
| `actorId`     | `String` `@db.Uuid`               | FK → `users.id`, the user who triggered the event                                  |
| `type`        | `NotificationType`                | Type of notification event                                                         |
| `postId`      | `String?` `@db.Uuid`              | FK → `posts.id`, nullable because `follow` notifications are not related to a post |
| `commentId`   | `String?` `@db.Uuid`              | FK → `comments.id`, nullable because only `comment` notifications need this        |
| `isRead`      | `Boolean` `@default(false)`       | Whether the recipient has read the notification                                    |
| `emailSent`   | `Boolean` `@default(false)`       | Whether the email notification has been dispatched                                 |
| `createdAt`   | `DateTime` `@default(now())`      | Timestamp when the notification was created                                        |

---

## 12. post_views

| Field       | Type                              | Description                                                                                                 |
| ----------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `id`        | `String` `@id` `@default(uuid())` | Primary key                                                                                                 |
| `postId`    | `String` `@db.Uuid`               | FK → `posts.id`                                                                                             |
| `userId`    | `String?` `@db.Uuid`              | FK → `users.id`, nullable to track anonymous (unauthenticated) visitors                                     |
| `ipAddress` | `String?` `@db.VarChar(45)`       | Viewer IP address, used to deduplicate anonymous views. `VarChar(45)` accommodates IPv6 (max 45 characters) |
| `viewedAt`  | `DateTime` `@default(now())`      | Timestamp of the view, used to calculate weekly/monthly trending                                            |

---

## Index Summary

| Table           | Index                                               | Purpose                                       |
| --------------- | --------------------------------------------------- | --------------------------------------------- |
| `users`         | `email`, `nickname`                                 | Fast lookup by login email and mention tag    |
| `posts`         | `authorId`, `(status, publishedAt)`, `slug`         | Filter by author, published feed, URL lookup  |
| `comments`      | `postId`, `userId`                                  | Load comments per post, comments per user     |
| `reactions`     | `postId`                                            | Count and list reactions per post             |
| `bookmarks`     | `userId`                                            | Load reading list per user                    |
| `follows`       | `followerId`, `followingId`                         | Load following/followers lists                |
| `notifications` | `(recipientId, isRead)`, `(recipientId, createdAt)` | Unread count, chronological notification feed |
| `post_views`    | `postId`, `(postId, viewedAt)`                      | Total view count, trending calculation        |

---

## Key Design Decisions

**Soft delete on comments** — `isDeleted` flag is used instead of hard delete to preserve notification records that reference the comment.

**Denormalized `viewCount` on posts** — stored directly on the post for fast feed queries. The `post_views` table provides the detailed data needed for trending and dashboard analytics.

**Nullable `userId` on post_views** — allows tracking anonymous visitors by IP address without requiring authentication.

**Nullable `postId` and `commentId` on notifications** — a `follow` notification does not relate to any post or comment, so both fields are optional and set based on notification type.

**`onDelete: Cascade` on junction tables** — ensures `post_tags` and `post_categories` records are cleaned up automatically when a post or tag/category is deleted.

**`onDelete: SetNull` on post_views.userId** — deleting a user retains the view history but nullifies the user reference, preserving accurate analytics data.
