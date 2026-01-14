export const mcp__supabase__execute_sql = async (query: string) => {
  console.log('Executing SQL:', query);
  return { data: [], error: null };
};

export const supabase = {
  from: (table: string) => ({
    select: () => ({
      data: [],
      error: null
    }),
    insert: (data: any) => ({
      data: null,
      error: null
    }),
    update: (data: any) => ({
      data: null,
      error: null
    }),
    delete: () => ({
      data: null,
      error: null
    })
  })
};
