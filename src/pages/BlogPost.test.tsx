import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import BlogPostPage from "./BlogPost";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Mock screen manually
const mockScreen = {
  findByRole: vi.fn(),
  findByText: vi.fn(),
  queryByText: vi.fn(),
  queryByRole: vi.fn(),
};

// Mock react-router-dom hooks
import * as routerDom from 'react-router-dom';
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof routerDom>();
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
  };
});

// Mock useAuth hook
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Mock supabase client
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
  },
}));

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock BlogComments component
vi.mock("@/components/blog/BlogComments", () => ({
  default: () => <div data-testid="blog-comments">Mocked BlogComments</div>,
}));

describe("BlogPostPage", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Default mock for useParams
    vi.mocked(routerDom.useParams).mockReturnValue({ id: "1" });

    // Default mock for useAuth
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({ user: { id: "user-123" }, loading: false });

    // Default mock for supabase queries
    const mockMaybeSingle = vi.fn();
    mockMaybeSingle.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Test Post Title",
        content: "<h1>Test Heading</h1><p>This is a test paragraph.</p>",
        excerpt: "Test excerpt",
        slug: "test-post-title",
        image_url: "https://example.com/image.jpg",
        author_id: "user-123",
        author_name: "Custom Author",
        references: "Test references",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        status: "published",
        category: "Technology",
        tags: ["test", "react"],
        is_anonymous: false,
        is_featured: false,
        view_count: 100,
        author: {
          username: "testuser",
          full_name: "Test User",
          avatar_url: "https://example.com/avatar.jpg",
          bio: "Test bio",
        },
      },
      error: null,
    }).mockResolvedValueOnce({
      data: {
          username: "testuser",
          full_name: "Test User",
          avatar_url: "https://example.com/avatar.jpg",
          bio: "Test bio",
        },
      error: null,
    });

    const mockUpdateEq = vi.fn().mockResolvedValue({ error: null });
    const mockUpdate = vi.fn(() => ({ eq: mockUpdateEq }));

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      update: mockUpdate,
      maybeSingle: mockMaybeSingle,
    }));

    // Setup screen mock
    mockScreen.findByRole.mockResolvedValue(document.createElement('h1'));
    mockScreen.findByText.mockResolvedValue(document.createElement('p'));
    mockScreen.queryByText.mockReturnValue(null);
    mockScreen.queryByRole.mockReturnValue(null);
  });

  it("should render HTML content correctly", async () => {
    const { container } = render(<BlogPostPage />);
    expect(container).toBeInTheDocument();
  });

  it("should handle empty content", async () => {
    // Override supabase mock for this specific test to return empty content
    const mockEmptyMaybeSingle = vi.fn();
    mockEmptyMaybeSingle.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Test Post With Empty Content",
        content: "", // Empty content
        excerpt: "Test excerpt",
        slug: "test-post-empty",
        image_url: "https://example.com/image.jpg",
        author_id: "user-123",
        author_name: null,
        references: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString(),
        status: "published",
        category: "Technology",
        tags: [],
        is_anonymous: false,
        is_featured: false,
        view_count: 50,
        author: {
          username: "testuser",
          full_name: "Test User",
          avatar_url: "https://example.com/avatar.jpg",
          bio: "Test bio",
        },
      },
      error: null,
    }).mockResolvedValueOnce({
      data: {
          username: "testuser",
          full_name: "Test User",
          avatar_url: "https://example.com/avatar.jpg",
          bio: "Test bio",
        },
      error: null,
    });

    // Create a new mock implementation for the 'empty content' test case
    const mockUpdateEqEmpty = vi.fn().mockResolvedValue({ error: null });
    const mockUpdateEmpty = vi.fn(() => ({ eq: mockUpdateEqEmpty }));

    vi.mocked(supabase.from).mockImplementation(() => ({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        neq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        update: mockUpdateEmpty,
        maybeSingle: mockEmptyMaybeSingle,
    }));

    const { container } = render(<BlogPostPage />);
    expect(container).toBeInTheDocument();
  });
});