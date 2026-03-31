import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch active categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')

    if (catError) throw catError

    // Fetch active dishes with category info
    const { data: dishes, error: dishError } = await supabase
      .from('dishes')
      .select('*, categories(name)')
      .eq('is_active', true)

    if (dishError) throw dishError

    return NextResponse.json({ categories, dishes })
  } catch (error: any) {
    console.error('Menu API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch menu' },
      { status: 500 }
    )
  }
}
