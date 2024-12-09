import { board } from "@/lib/db/schemas";
import { eq, sql } from "drizzle-orm";

export const searchFilter = (query?: string) => {
    if (query) {
        return sql`similarity(${board.title}, ${query}) > 0.01`
    }
    return undefined;
}

export const categoryFilter = (category?: string) => {
    if (category) {
        return eq(board.category, category)
    }
    return undefined;
}

export const datetimeFilter = (datetime?: string) => {
    switch (datetime) {
        case 'a_hour':
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '1 hour'`;
        case 'a_day':
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '1 day'`;
        case '3_days': // Handle 3 days ago
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '3 days'`;
        case 'a_week':
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '1 week'`;
        case 'a_month':
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '1 month'`;
        case 'a_year':
            return sql`${board.createdAt} < now() AT TIME ZONE 'UTC' - interval '1 year'`;
        default:
            return undefined;
    }
};
