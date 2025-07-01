
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import BlogPostPage from "./BlogPost"; // Adjust path as necessary
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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
    mockMaybeSingle.mockResolvedValueOnce({ // For fetchPost
      data: {
        id: 1,
        title: "Test Post Title",
        content: "<h1>Test Heading</h1><p>This is a test paragraph.</p>",
        excerpt: "Test excerpt",
        slug: "test-post-title",
        image_url: "https://example.com/image.jpg",
        author_id: "user-123",
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
    }).mockResolvedValueOnce({ // For author details in fetchPost
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
  });

  it("should render HTML content correctly", async () => {
    render(<BlogPostPage />);

    // Wait for the post to load and render
    const headingElement = await screen.findByRole("heading", { name: /Test Heading/i, level: 1 });
    expect(headingElement).toBeInTheDocument();

    const paragraphElement = await screen.findByText(/This is a test paragraph./i);
    expect(paragraphElement).toBeInTheDocument();

    // Check that raw HTML tags are not present as text
    expect(screen.queryByText("<h1>", { exact: false })).not.toBeInTheDocument();
    expect(screen.queryByText("<p>", { exact: false })).not.toBeInTheDocument();
  });

  it("should handle empty content", async () => {
    // Override supabase mock for this specific test to return empty content
    const mockEmptyMaybeSingle = vi.fn();
    mockEmptyMaybeSingle.mockResolvedValueOnce({ // For fetchPost
      data: {
        id: 1,
        title: "Test Post With Empty Content",
        content: "", // Empty content
        excerpt: "Test excerpt",
        slug: "test-post-empty",
        image_url: "https://example.com/image.jpg",
        author_id: "user-123",
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
    }).mockResolvedValueOnce({ // For author details in fetchPost
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
        maybeSingle: mockEmptyMaybeSingle, // Use the specific mock for this test
    }));


    render(<BlogPostPage />);

    // Check that the main content area is present but doesn't contain the specific HTML from other tests
    // The "prose" div should be there
    const contentArea = await screen.findByRole('article'); // The article surrounds the content
    expect(contentArea).toBeInTheDocument();

    // Ensure no h1 or p from the other test is rendered
    expect(screen.queryByRole("heading", { name: /Test Heading/i, level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByText(/This is a test paragraph./i)).not.toBeInTheDocument();
  });
});
