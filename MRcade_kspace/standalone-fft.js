class FFT {
    static fft(signal) {
        const N = signal.length;
        if (N === 1) return signal;
        const even = [], odd = [];
        for (let i = 0; i < N; i++) {
            if (i % 2 === 0) even.push(signal[i]);
            else odd.push(signal[i]);
        }
        const evenFFT = this.fft(even);
        const oddFFT = this.fft(odd);
        const result = new Array(N);
        for (let k = 0; k < N/2; k++) {
            const angle = -2 * Math.PI * k / N;
            const twiddle = { real: Math.cos(angle), imag: Math.sin(angle) };
            const oddPart = {
                real: twiddle.real * oddFFT[k].real - twiddle.imag * oddFFT[k].imag,
                imag: twiddle.real * oddFFT[k].imag + twiddle.imag * oddFFT[k].real
            };
            result[k] = {
                real: evenFFT[k].real + oddPart.real,
                imag: evenFFT[k].imag + oddPart.imag
            };
            result[k + N/2] = {
                real: evenFFT[k].real - oddPart.real,
                imag: evenFFT[k].imag - oddPart.imag
            };
        }
        return result;
    }
    static ifft(spectrum) {
        const N = spectrum.length;
        const conjugate = spectrum.map(c => ({ real: c.real, imag: -c.imag }));
        const result = this.fft(conjugate);
        return result.map(c => ({ real: c.real / N, imag: -c.imag / N }));
    }
}
if (typeof window !== 'undefined') window.FFT = FFT;


