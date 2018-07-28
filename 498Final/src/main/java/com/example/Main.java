/*
 * Copyright 2002-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.IOException;

@Controller
@SpringBootApplication
public class Main {

  public static void main(String[] args) throws Exception {
    SpringApplication.run(Main.class, args);
  }

  @RequestMapping(value={"/dashboard","/"})
  String dashboard() {
    return "/index.html";
  }
  @RequestMapping(value="/ageGroup")
  String ageGroup() {
    return "/ageGroup.html";
  }
  @RequestMapping(value="/mortgage")
  String mortgage() {
    return "/mortgage.html";
  }
  @RequestMapping(value="/provinceBar")
  String provinceBar() {
    return "/provinceBar.html";
  }
//  @RequestMapping(value="/provinceMap")
//  String provinceMap() {
//    return "/fragments/provinceMap.html";
//  }

//  @RequestMapping("/ageGroup")
//  String ageGroup()
//  {
//    return "ageGroup";
//  }
//
//  @Bean
//    public File modifyCSV() throws IOException {
//      CsvModifier csvModifier = new CsvModifier();
//      return csvModifier.createNewCsv("src/main/resources/CSV/MortgageCanada.csv", "src/main/resources/CSV/MortgageCanada_part.csv");
//
//  }


}
