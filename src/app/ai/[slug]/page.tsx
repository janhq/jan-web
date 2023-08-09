import AIModelDetail from "@/screens/AIModelDetail";

interface IModelDetailProps {
  params: { slug: string };
}

const ModelDetail: React.FC<IModelDetailProps> = async ({ params }) => {
  return <AIModelDetail slug={params.slug} />;
};

export default ModelDetail;
