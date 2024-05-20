import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "config"
import i18n from "locales/i18n"
import { ImageOrVideo } from "react-native-image-crop-picker"
import {
  AuthRequest,
  AuthResponse,
  ProsResponse,
  ProsRegFlowRequest,
  ProsSignUpRequest,
  ProsSignUpResponse,
  ServicesResponce,
  AuthResetRequest,
  AuthResetConfirmRequest,
  AuthResetNewRequest,
  ProsRegistrationResponse,
  ResponseTimeResponse,
  MyReviewResponse,
  ProsServicesCategoriesResponse,
  CreateProsServiceCategoriesRequest,
  ProsServicesCategoriesPlaceOfServiceRequest,
  RefreshTokenResponse,
  RefreshTokenRequest,
  ProsServicesQuestionRequest,
  CreateMenuSectionRequest,
  CreateMenuSectionItemRequest,
  GetSimilarServicesResponse,
  GetSimilarServicesRequest,
  GetJobsResponse,
  PatchProsServiceCategoriesFoodCategoriesRequest,
  PatchProsServiceCategoriesFoodDeliveryChargeRequest,
  PatchProsServiceCategoriesFoodDiscountsRequest,
  DeleteProsServicesCategoriesMenuSectionRequest,
  PostProsServicesCategoriesMenuSectionItemRequest,
  DeleteProsServicesCategoriesMenuSectionItemRequest,
  PatchProsServicesCategoriesMenuSectionItemRequest,
  PostProfilePhotoResponse,
  DocumentsRequest,
  MyDocumentsResponse,
  GetPointsPackagesResponse,
  PostPointsPackageRequest,
} from "services"
import { RootState } from "store"
import { logout, setLogout, setTokens } from "store/auth/slice"
import { PointsItemPackagesType, SubCategoryType } from "types"

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const { token } = state.auth
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
      headers.set("x-custom-lang", i18n.language)
    }

    return headers
  },
})

type BaseQueryType = typeof baseQuery

const baseQueryWithReauth: BaseQueryType = async (
  args,
  apiBase,
  extraOptions
) => {
  const state = apiBase.getState() as RootState
  const { dispatch } = apiBase
  const result = await baseQuery(args, apiBase, extraOptions)
  if (result?.error?.status === 401) {
    if (state.auth.refreshToken && !state.auth.isLogout) {
      try {
        await fetch(`${API_URL}/auth/refresh/${state.auth.refreshToken}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (res) => {
          await res.json().then((resJ) => {
            dispatch(setTokens(resJ))
          })
        })
      } catch (e) {
        dispatch(logout())
        console.log("refetchError", e)
      }
    } else {
      dispatch(logout())
    }
  }
  return result
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Services",
    "ProsServicesCategories",
    "MyReviews",
    "Documents",
    "Jobs",
    "PointsPackages",
  ],
  endpoints: (builder) => ({
    prosSignUp: builder.mutation<ProsSignUpResponse, ProsSignUpRequest>({
      query: ({ lang, ...body }) => ({
        url: "/pros/signup",
        method: "POST",
        body,
      }),
    }),
    prosRegFlow: builder.mutation<
      ProsRegistrationResponse,
      Partial<ProsRegFlowRequest>
    >({
      query: (body) => ({
        url: "/pros",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getServices: builder.query<ServicesResponce, void | string>({
      query: (body) =>
        "/services?page=1&perPage=100&sort=ASC" +
        (typeof body === "string" ? `&search=${body}` : ""),
      providesTags: ["Services"],
    }),
    auth: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getPros: builder.query<ProsResponse, void>({
      query: () => "/pros/me",
      providesTags: ["Auth"],
    }),
    authResetPassword: builder.mutation<void, AuthResetRequest>({
      query: ({ lang, ...body }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    authResetConfirm: builder.mutation<void, AuthResetConfirmRequest>({
      query: ({ lang, ...body }) => ({
        url: "/auth/reset-password/confirm",
        method: "POST",
        body,
      }),
    }),
    authResetNew: builder.mutation<void, AuthResetNewRequest>({
      query: ({ lang, ...body }) => ({
        url: "/auth/reset-password/new",
        method: "POST",
        body,
      }),
    }),
    responseTime: builder.query<ResponseTimeResponse, void>({
      query: () => "/pros/response-time",
      providesTags: ["Auth"],
    }),
    prosServiceCategories: builder.query<
      ProsServicesCategoriesResponse[],
      void
    >({
      query: () => "/pros/me/service-categories",
      providesTags: ["ProsServicesCategories"],
    }),
    getProsReviewMe: builder.query<MyReviewResponse, number>({
      query: (number) => `/reviews/pro/me?page=${number}&perPage=20`,
      providesTags: ["MyReviews"],
    }),
    createProsServiceCategories: builder.mutation<
      ProsServicesCategoriesResponse,
      CreateProsServiceCategoriesRequest
    >({
      query: (body) => ({
        url: "/pros/me/service-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProsServicesCategories", "Jobs"],
    }),
    deleteProsServiceCategories: builder.mutation<
      void,
      CreateProsServiceCategoriesRequest
    >({
      query: (body) => ({
        url: "/pros/me/service-categories/" + body.serviceCategoryId,
        method: "DELETE",
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    prosServicesCategoriesPlaceOfService: builder.mutation<
      ProsServicesCategoriesResponse,
      ProsServicesCategoriesPlaceOfServiceRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/pros/me/service-categories/${id}/place-of-service`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    refreshToken: builder.query<RefreshTokenResponse, string>({
      query: (refreshToken) => ({
        url: "/auth/validate/" + refreshToken,
        method: "GET",
      }),
    }),
    prosServicesQuestion: builder.mutation<
      ProsServicesCategoriesResponse,
      ProsServicesQuestionRequest
    >({
      query: ({ serivceId, ...body }) => ({
        url: `/pros/me/service-categories/${serivceId}/questions`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    createProsMenuSection: builder.mutation<
      ProsServicesCategoriesResponse,
      CreateMenuSectionRequest
    >({
      query: ({ serviceId, ...body }) => ({
        url: `/pros/me/service-categories/${serviceId}/menu-sections`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    createProsMenuSectionItem: builder.mutation<
      ProsServicesCategoriesResponse,
      CreateMenuSectionItemRequest
    >({
      query: ({ serviceId, sectionId, ...body }) => ({
        url: `/pros/me/service-categories/${serviceId}/menu-sections/${sectionId}/items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    getSimilarServices: builder.query<
      GetSimilarServicesResponse,
      GetSimilarServicesRequest
    >({
      query: ({ id, serviceId }) =>
        `/services/${serviceId}/categories/${id}/relatedCategories`,
    }),
    getJobs: builder.query<
      GetJobsResponse,
      { page: number; sort?: "ASC" | "DESC" | "nearest_to_me" }
    >({
      query: (body) => {
        const url = "/jobs/pro-jobs/available"
        const params = new URLSearchParams()
        params.append("page", body.page.toString())
        params.append("perPage", "20")
        if (body.sort) {
          params.append("sort", body.sort)
        }
        return {
          url: url + "?" + params,
          method: "GET",
        }
      },
      providesTags: ["Jobs"],
    }),
    patchProsServiceCategoriesFoodCategories: builder.mutation<
      ProsServicesCategoriesResponse,
      PatchProsServiceCategoriesFoodCategoriesRequest
    >({
      query: ({ serviceId, ...body }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/food-categories`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    patchProsServiceCategoriesFoodDeliveryCharge: builder.mutation<
      ProsServicesCategoriesResponse,
      PatchProsServiceCategoriesFoodDeliveryChargeRequest
    >({
      query: ({ serviceId, ...body }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/delivery-charge`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    patchProsServiceCategoriesFoodDiscounts: builder.mutation<
      ProsServicesCategoriesResponse,
      PatchProsServiceCategoriesFoodDiscountsRequest
    >({
      query: ({ serviceId, ...body }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/discounts`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    deleteProsServicesCategoriesMenuSection: builder.mutation<
      ProsServicesCategoriesResponse,
      DeleteProsServicesCategoriesMenuSectionRequest
    >({
      query: ({ serviceId, sectionId }) => ({
        url: `/pros/me/service-categories/${serviceId}/menu-sections/${sectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProsServicesCategories"],
    }),
    postdProsServicesCategoriesMenuSectionItem: builder.mutation<
      ProsServicesCategoriesResponse,
      PostProsServicesCategoriesMenuSectionItemRequest
    >({
      query: ({ serviceId, sectionId, ...body }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/menu-sections/${sectionId}/items`,
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    deleteProsServicesCategoriesMenuSectionItem: builder.mutation<
      ProsServicesCategoriesResponse,
      DeleteProsServicesCategoriesMenuSectionItemRequest
    >({
      query: ({ serviceId, sectionId, menuItemId }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/menu-sections/${sectionId}/items/${menuItemId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    patchProsServicesCategoriesMenuSectionItem: builder.mutation<
      ProsServicesCategoriesResponse,
      PatchProsServicesCategoriesMenuSectionItemRequest
    >({
      query: ({ serviceId, sectionId, id, ...body }) => {
        return {
          url: `/pros/me/service-categories/${serviceId}/menu-sections/${sectionId}/items/${id}`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: ["ProsServicesCategories"],
    }),
    postProfilePhoto: builder.mutation<
      PostProfilePhotoResponse,
      ImageOrVideo | string | undefined
    >({
      query: (file) => {
        const formData = new FormData()
        if (typeof file !== "string" && !!file) {
          formData.append("file", {
            type: file?.mime,
            uri: file?.path,
            name:
              file?.filename ||
              file?.path.split("/")[Number(file?.path.split("/").length) - 1] ||
              "no-name",
          })
        } else {
          formData.append("file", {
            type: "image/jpeg",
            uri: file,
            name: "no-name",
          })
        }
        return {
          url: "/files",
          method: "POST",
          body: formData,
        }
      },
    }),
    postMultiPhoto: builder.mutation<
      PostProfilePhotoResponse[],
      ImageOrVideo[] | undefined
    >({
      query: (arr) => {
        const formData = new FormData()
        arr?.map((item) =>
          formData.append("files", {
            type: item.mime,
            uri: item.path,
            name: item.filename,
          })
        )
        return {
          url: "/files/multi",
          method: "POST",
          body: formData,
        }
      },
    }),
    postDocument: builder.mutation<MyDocumentsResponse, DocumentsRequest>({
      query: (body) => ({
        url: "/pro-documents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Documents"],
    }),
    getMyDocument: builder.query<MyDocumentsResponse, void>({
      query: () => "/pro-documents/me",
      providesTags: ["Documents"],
    }),
    getPointsPackages: builder.query<GetPointsPackagesResponse, number>({
      query: (page) => {
        const params = new URLSearchParams()
        params.append("page", page.toString())
        return {
          url: "/points/packages?" + params,
        }
      },
      providesTags: ["PointsPackages"],
    }),
    postPointsPackages: builder.mutation<
      PointsItemPackagesType,
      PostPointsPackageRequest
    >({
      query: (body) => ({
        url: "points/packages",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PointsPackages"]
    }),
  }),
})

export const {
  useProsSignUpMutation,
  useProsRegFlowMutation,
  useGetServicesQuery,
  useAuthMutation,
  useLazyGetProsQuery,
  useAuthResetConfirmMutation,
  useAuthResetNewMutation,
  useAuthResetPasswordMutation,
  useGetProsQuery,
  useResponseTimeQuery,
  useProsServiceCategoriesQuery,
  useLazyGetProsReviewMeQuery,
  useLazyProsServiceCategoriesQuery,
  useCreateProsServiceCategoriesMutation,
  useDeleteProsServiceCategoriesMutation,
  useProsServicesCategoriesPlaceOfServiceMutation,
  useLazyRefreshTokenQuery,
  useProsServicesQuestionMutation,
  useCreateProsMenuSectionMutation,
  useCreateProsMenuSectionItemMutation,
  useLazyGetServicesQuery,
  useLazyGetSimilarServicesQuery,
  useGetSimilarServicesQuery,
  useGetJobsQuery,
  useLazyGetJobsQuery,
  usePatchProsServiceCategoriesFoodCategoriesMutation,
  usePatchProsServiceCategoriesFoodDeliveryChargeMutation,
  usePatchProsServiceCategoriesFoodDiscountsMutation,
  useDeleteProsServicesCategoriesMenuSectionMutation,
  usePostdProsServicesCategoriesMenuSectionItemMutation,
  useDeleteProsServicesCategoriesMenuSectionItemMutation,
  usePatchProsServicesCategoriesMenuSectionItemMutation,
  usePostProfilePhotoMutation,
  usePostMultiPhotoMutation,
  usePostDocumentMutation,
  useGetMyDocumentQuery,
  useGetPointsPackagesQuery,
  useLazyGetPointsPackagesQuery,
  usePostPointsPackagesMutation,
} = api
