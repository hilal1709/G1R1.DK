export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img
                    src="/images/giri-dk-logo-o.PNG"
                    alt="Damar Kurung Logo"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Damar Kurung
                </span>
            </div>
        </>
    );
}
