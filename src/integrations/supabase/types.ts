export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          category: string | null
          collection_name: string | null
          colors: string[] | null
          created_at: string | null
          custom_colors: string | null
          custom_sizes: string | null
          description: string | null
          discount_type: string | null
          discount_value: number | null
          final_price: number | null
          gallery_images: string[] | null
          id: string
          in_stock: boolean | null
          is_active: boolean | null
          main_image: string | null
          name: string
          price: number
          shoes_sizes: string[] | null
          sizes: string[] | null
          store_id: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          collection_name?: string | null
          colors?: string[] | null
          created_at?: string | null
          custom_colors?: string | null
          custom_sizes?: string | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          final_price?: number | null
          gallery_images?: string[] | null
          id?: string
          in_stock?: boolean | null
          is_active?: boolean | null
          main_image?: string | null
          name: string
          price: number
          shoes_sizes?: string[] | null
          sizes?: string[] | null
          store_id: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          collection_name?: string | null
          colors?: string[] | null
          created_at?: string | null
          custom_colors?: string | null
          custom_sizes?: string | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          final_price?: number | null
          gallery_images?: string[] | null
          id?: string
          in_stock?: boolean | null
          is_active?: boolean | null
          main_image?: string | null
          name?: string
          price?: number
          shoes_sizes?: string[] | null
          sizes?: string[] | null
          store_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      "Profils commercant": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      stores: {
        Row: {
          address: string | null
          city: string | null
          contact: string | null
          country: string | null
          cover: string | null
          created_at: string | null
          delivery_methods: string[] | null
          id: string
          is_active: boolean | null
          logo: string | null
          name: string
          owner_id: string
          payment_methods: string[] | null
          refund_policy: string | null
          sector: string | null
          shipping_policy: string | null
          theme: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string | null
          delivery_methods?: string[] | null
          id?: string
          is_active?: boolean | null
          logo?: string | null
          name: string
          owner_id: string
          payment_methods?: string[] | null
          refund_policy?: string | null
          sector?: string | null
          shipping_policy?: string | null
          theme?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string | null
          delivery_methods?: string[] | null
          id?: string
          is_active?: boolean | null
          logo?: string | null
          name?: string
          owner_id?: string
          payment_methods?: string[] | null
          refund_policy?: string | null
          sector?: string | null
          shipping_policy?: string | null
          theme?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
