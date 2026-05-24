package hr.runtime.crew.common;

import java.time.Instant;

public record ApiError(
        String message,
        String code,
        int status,
        Instant timestamp
) {
    public ApiError(String message, String code, int status) {
        this(message, code, status, Instant.now());
    }
}