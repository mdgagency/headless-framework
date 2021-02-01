declare namespace JSONGraphQL {
    type MapToBoolean<Type> = {
        [K in keyof Type]?: WPGraphQL.Scalars['Boolean'];
    }

    type Merge<Type, ToBoolean> = Type & MapToBoolean<Omit<ToBoolean, keyof Type>>;

    type TypeName<Type> {
        __typename: Type;
    }

    type ConnectionToEdge<Type> = {
        cursor?: WPGraphQL.Scalars['Boolean'];
        node?: Type;
    }

    type PageInfo = MapToBoolean<WPGraphQL.WpPageInfo>;

    type Connection<Type> = {
        edges?: ConnectionToEdge<Type>[];
        nodes?: Type[];
        pageInfo?: PageInfo;
    }

    type Commenter = MapToBoolean<WPGraphQL.Commenter>;
    type ConditionalTags = MapToBoolean<WPGraphQL.ConditionalTags>;
    type Node = MapToBoolean<WPGraphQL.Node>;
    type DatabaseIdentifier = MapToBoolean<WPGraphQL.DatabaseIdentifier>;
    type MenuItemLinkable = MapToBoolean<WPGraphQL.MenuItemLinkable>;
    type UniformResourceIdentifiable = Merge<{
        conditionalTags?: ConditionalTags;
    }, WPGraphQL.UniformResourceIdentifiable>;

    type Taxonomy = Merge<Node & {
        connectedContentTypes?: Connection<ContentType>;
    }, WPGraphQL.Taxonomy>;

    type PostTypeLabelDetails = MapToBoolean<WPGraphQL.PostTypeLabelDetails>;

    type EnqueuedScript = {};
    type EnqueuedStyleSheets = {};
    type ContentTemplate = {};
    type Comment = {};
    type MediaItem = {};
    type Category = {};
    type Tag = {};
    type Page = {};
    type Post = Merge<ContentNode & DatabaseIdentifier & MenuItemLinkable & Node & NodeWithAuthor & NodeWithComments & NodeWithContentEditor & NodeWithExcerpt & NodeWithFeaturedImage & NodeWithRevisions & NodeWithTemplate & NodeWithTitle & NodeWithTrackbacks & UniformResourceIdentifiable & {
        categories?: Connection<Category>;
        comments?: Connection<Comments>;
        conditionalTags?: ConditionalTags;
        contentType?: ConnectionToEdge<ContentType>;
        editingLockedBy?: ConnectionToEdge<User>;
        enqueuedScripts?: Connection<EnqueuedScript>;
        enqueuedStylesheets?: Connection<EnqueuedStyleSheets>;
        lastEditedBy?: ConnectionToEdge<User>;
        postFormats?: Connection<PostFormat>;
        preview?: ConnectionToEdge<Post>;
        revisions?: Connection<Post>;
        tags?: Connection<Tag>;
        template?: ContentTemplate;
        terms?: Connection<TermNode>;
    }, WPGraphQL.Post>;;
    type PostFormat = {};
    type ContentRevisionUnion = Page | Post;
    type MenuItemObjectUnion = Category | Page | Post | Tag;
    type PostObjectUnion = MediaItem | Page | Post;
    type TermObjectUnion = Category | PostFormat | Tag;
    type Role = {};

    type User = Merge<Commenter & DatabaseIdentifier & Node & UniformResourceIdentifiable & {
        comments?: Connection<Comment>;
        conditionalTags?: ConditionalTags;
        enqueuedScripts?: Connection<EnqueuedScript>;
        enqueuedStylesheets?: Connection<EnqueuedStyleSheets>;
        mediaItems?: Connection<MediaItem>;
        pages?: Connection<Page>;
        posts?: Connection<Post>;
        revisions?: Connection<ContentRevisionUnion>;
        roles?: Connection<Role>;
    }, WPGraphQL.User>;

    type TermNode = Merge<{
        enqueuedScripts?: Connection<EnqueuedScript>;
        enqueuedStylesheets?: Connection<EnqueuedStyleSheets>;
    }, WPGraphQL.TermNode>;

    type NodeWithAuthor = Merge<{
        author?: ConnectionToEdge<User>;
    }, WPGraphQL.NodeWithAuthor>;

    type NodeWithComments = MapToBoolean<WPGraphQL.NodeWithComments>;
    type NodeWithContentEditor = MapToBoolean<WPGraphQL.NodeWithContentEditor>;
    type NodeWithExcerpt = MapToBoolean<WPGraphQL.NodeWithExcerpt>;
    type NodeWithFeaturedImage = Merge<{
        featuredImage?: ConnectionToEdge<MediaItem>;
    }, WPGraphQL.NodeWithFeaturedImage>;
    type NodeWithRevisions = Merge<{
        revisionOf?: ConnectionToEdge<ContentNode>;
    }, WPGraphQL.NodeWithRevisions>;
    type NodeWithTemplate = Merge<{
        template?: ContentTemplate;
    }, WPGraphQL.NodeWithTemplate>;
    type NodeWithTitle = MapToBoolean<WPGraphQL.NodeWithTitle>;
    type NodeWithTrackbacks = MapToBoolean<WPGraphQL.NodeWithTrackbacks>;

    type ContentType = Merge<Node & UniformResourceIdentifiable & {
        connectedTaxonomies?: Connection<Taxonomy>;
        contentNodes?: Connection<ContentNode>;
        labels?: PostTypeLabelDetails;
    }, WPGraphQL.ContentNode>;

    type ContentNode = Merge<{
        conditionalTags?: ConditionalTags;
        editingLockedBy?: ConnectionToEdge<User>;
        enqueuedScripts?: Connection<EnqueuedScript>;
        enqueuedStylesheets?: Connection<EnqueuedStyleSheets>;
        lastEditedBy?: ConnectionToEdge<User>;
        template?: ContentTemplate;
    }, WPGraphQL.ContentNode>;

    type PostQuery = TypeName<'Post'> & Post;

    export interface Query {
        query: {
            contentNode?: {
                __variables?: {
                    id?: WPGraphQL.Scalars['ID'];
                    idType?: WPGraphQL.ContentNodeIdTypeEnum;
                    asPreview?: boolean;
                };
                __args?: {
                    id?: string;
                    idType?: WPGraphQL.ContentNodeIdTypeEnum;
                    asPreview?: boolean;
                }
                __on?: [PostQuery?]
            }
        }
    }
}