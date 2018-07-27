package com.example;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class CsvModifier {

    public File createNewCsv(String oldFilePath, String newFilePath) throws IOException {
        //BufferedReader reader;
        Writer writer;
        File file = new File(newFilePath);
        String bothSex = "Both";
        writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(newFilePath)));
        try(Stream<String> stream = Files.lines(Paths.get(oldFilePath))){

            stream.forEach(line -> {
//                if (line.contains(bothSex) &&!line.contains("to")
//                        && line.contains("Immigrants")
//                        && !line.contains("Canada")
//                        && line.contains("All ages")) {
                if((line.matches("\"199[0-9].*")
                        || line.matches("\"200[0-9].*")
                        || line.matches("\"201[0-9].*"))
                        && (line.contains("Bank rate") || line.contains("Chartered bank administered interest rates - prime business"))
                        && !line.contains("Bank rate, last Tuesday"))
                {
                    try {
                        writer.append(line + "\n");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });

        } catch (IOException e) {
            e.printStackTrace();
        }
        writer.close();
        return file;
    }
}
