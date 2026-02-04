export default function CircularLoader() {
  return (
    <div className='flex items-center justify-center py-12'>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#121212] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
