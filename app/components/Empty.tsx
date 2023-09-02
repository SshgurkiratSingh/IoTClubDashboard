"use client";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showHome?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing Found",
  subtitle = "The item you are looking for is not found.",
  showHome,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl font-bold text-gray-700">{title}</h1>
      <p className="text-lg text-gray-500">{subtitle}</p>
    </div>
  );
};
export default EmptyState;
