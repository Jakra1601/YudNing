-- ==============================================================================
-- YudNing: Member Personalization Schema (Version 1)
-- ==============================================================================

-- 1. Table: user_saved_content
CREATE TABLE public.user_saved_content (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_id text NOT NULL,
    content_type text NOT NULL CHECK (content_type IN ('topic', 'video')),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(user_id, content_id, content_type)
);

-- 2. Table: user_learning_activity
CREATE TABLE public.user_learning_activity (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_id text NOT NULL,
    content_type text NOT NULL CHECK (content_type IN ('topic', 'video')),
    first_viewed_at timestamptz NOT NULL DEFAULT now(),
    last_viewed_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE(user_id, content_id, content_type)
);

-- Composite index for Continue Learning / Learning History
CREATE INDEX idx_user_learning_activity_user_last_viewed ON public.user_learning_activity(user_id, last_viewed_at DESC);

-- 3. Table: meditation_sessions
CREATE TABLE public.meditation_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    practiced_at timestamptz NOT NULL DEFAULT now(),
    duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
    note text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Composite index for practice history
CREATE INDEX idx_meditation_sessions_user_practiced_at ON public.meditation_sessions(user_id, practiced_at DESC);


-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.user_saved_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_learning_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_sessions ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Policies for user_saved_content
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can select their own saved content"
    ON public.user_saved_content FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own saved content"
    ON public.user_saved_content FOR INSERT
    TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own saved content"
    ON public.user_saved_content FOR UPDATE
    TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own saved content"
    ON public.user_saved_content FOR DELETE
    TO authenticated
    USING ((select auth.uid()) = user_id);

-- ------------------------------------------------------------------------------
-- Policies for user_learning_activity
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can select their own learning activity"
    ON public.user_learning_activity FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own learning activity"
    ON public.user_learning_activity FOR INSERT
    TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own learning activity"
    ON public.user_learning_activity FOR UPDATE
    TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own learning activity"
    ON public.user_learning_activity FOR DELETE
    TO authenticated
    USING ((select auth.uid()) = user_id);

-- ------------------------------------------------------------------------------
-- Policies for meditation_sessions
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can select their own meditation sessions"
    ON public.meditation_sessions FOR SELECT
    TO authenticated
    USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert their own meditation sessions"
    ON public.meditation_sessions FOR INSERT
    TO authenticated
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own meditation sessions"
    ON public.meditation_sessions FOR UPDATE
    TO authenticated
    USING ((select auth.uid()) = user_id)
    WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete their own meditation sessions"
    ON public.meditation_sessions FOR DELETE
    TO authenticated
    USING ((select auth.uid()) = user_id);

-- ==============================================================================
-- Table Privileges
-- ==============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_saved_content TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.user_learning_activity TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.meditation_sessions TO authenticated;
