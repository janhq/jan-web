import EnhanceButton from "@/components/EnhanceButton";
import RandomButton from "@/components/RandomButton";
import SendButton from "@/components/SendButton";

export const InputToolbar: React.FC = () => {
  const onEnhanceClick = () => {};

  const onRandomClick = () => {};

  const onSubmitClick = () => {};

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#F8F8F8",
              borderWidth: 1,
              borderColor: "#D1D5DB",
            }}
            className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2 rounded-b-lg"
          >
            <div className="flex justify-end items-center space-x-1 w-full pr-3">
              <EnhanceButton onClick={onEnhanceClick} />
              <RandomButton onClick={onRandomClick} />
            </div>
            <div className="flex-shrink-0">
              <SendButton onClick={onSubmitClick} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
