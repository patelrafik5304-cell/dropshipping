export type User = {
  id: string;
  display_name: string;
  github_username: string;
  vercel_username: string;
  email: string | null;
  profile_picture_url: string | null;
  bio: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  user_id: string;
  name: string;
  github_repo_url: string;
  is_public: boolean;
  description: string | null;
  vercel_deployment_url: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

export type GitHubRepository = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  owner: string;
  description: string | null;
  language: string | null;
  created_at: string;
};

export type VercelDeployment = {
  id: string;
  project_id: string | null;
  deployment_url: string;
  name: string | null;
  framework: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<Omit<User, "id" | "created_at">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at" | "updated_at">>;
      };
      github_repositories: {
        Row: GitHubRepository;
        Insert: Omit<GitHubRepository, "id" | "created_at">;
        Update: Partial<Omit<GitHubRepository, "id" | "created_at">>;
      };
      vercel_deployments: {
        Row: VercelDeployment;
        Insert: Omit<VercelDeployment, "id" | "created_at">;
        Update: Partial<Omit<VercelDeployment, "id" | "created_at">>;
      };
    };
  };
};
