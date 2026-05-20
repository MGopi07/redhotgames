// app/components/GoogleMap.tsx

export default function GoogleMap() {
    return (
        <div className="w-full overflow-hidden rounded-2xl shadow-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57297.13505464207!2d28.22374!3d-26.161819!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9516a0b5ef9ac9%3A0x42f3d2774fb56aa9!2sRed%20Hot%20Games!5e0!3m2!1sen!2suk!4v1779275367968!5m2!1sen!2suk"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
            />
        </div>
    );
}